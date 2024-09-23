# Boilerplate project using Ionic + Capacitor + Vite + Vue 3 Typescript

## [Demo Link](https://www.youtube.com/watch?v=AJfg-NnBW98)
## [Dev URL](https://wolf-app.7dev.nl/)

## Issues
There is a warning npm throws with this boilerplate:

```
The above dynamic import cannot be analyzed by vite.
```
This is only a warning that vite can not analyse the dynamic import, there is no breaking features or stuff that does not work. And it seems to be an [issue of `Rollup` ](https://github.com/vitejs/vite/issues/1931#issuecomment-868310388)(this is what vite uses under the hood).

There should not be any other warnings or errors.

## Installation

Set correct nvm version:
<sub><sub>(not needed if you followed [this guide](https://github.com/nvm-sh/nvm#deeper-shell-integration) to do this automatically, please do it)</sub></sub>
```
nvm use
```

Install packages:

Install fontawesome. Get authtoken from: [FontAwesome Account](https://fontawesome.com/account#pro-package-tokens)

```
npm config set "@fortawesome:registry" https://npm.fontawesome.com/

npm config set "//npm.fontawesome.com/:_authToken" <AUTHTOKEN>
```

```
npm i
```

If U use `ionic cli` globally make sure it's up to date:

```
npm uninstall -g ionic
npm i -g @ionic/cli
```
## Usage
#### To just serve on web:

```
npm run serve
```
#### To build and open in Xcode or Android Studio:

```
npm run sync:<ios | android>:prod && ionic cap open <ios | android>
npm run sync:<ios | android>:stag && ionic cap open <ios | android>
npm run sync:<ios | android>:dev && ionic cap open <ios | android>
```

Or if you don't use ionic cli globally:

```
npx cap sync <ios | android> && npx cap open <ios | android>
```

#### ⚠️To Live reload⚠️
For iOS first make sure you run at least once:

```
ionic cap sync ios && ionic cap open ios
```

And do a `cmd + r` or just press the ▶️ icon to build the app once (this is needed for live reload)\
After this is successfull you can close Xcode and continue with this guide. (You probralby need to set Signing & Capabilities to 7Lab)

**So to live reload for an external device:**

```
ionic cap run <ios | android> -l --external
```

**And to live reload for an simulator:**

```
ionic cap run <ios | android> -l
```

Then do a `cmd + r` in Xcode (ctrl on windows) or `ctrl + r` for Android studio!


## How does the auth flow work

We use `jsforce.min.js` from the `jsforce` website under the chapter [Web Browser](https://jsforce.github.io/start/).

This file is just the browser version of `jsforce`.

It takes care of the a big part of the authentication flow.

##### Authentication flow using pinia and inappbrowser (new)
This method is the same as [Authentication flow using pinia (old)](#authentication-flow-using-pinia-(old)) but instead of using `window.location` we use `@capacitor/inappbrowser` to open the login page.
Wich is a better solution because it does not reload the app and gives a better user experience, because the user can close the inappbrowser and return to the app at any time.

##### Authentication flow using pinia (old)
We follow the same steps but internalised the functions from `forcejs`.

The following actions in the pinia salesforceStore:

```ts
actions: {
	async login() {
	    const oauth2 = new jsforce.OAuth2({
	        clientId: this.clientId,
	        redirectUri: this.redirectUri,
	        loginUrl: this.loginUrl,
	        scope: this.scope,
	    });
	    const authzUrl = oauth2.getAuthorizationUrl({
	        response_type: 'token',
	        scope: this.scope,
	    });
	    window.location.href = authzUrl;
	},
	setTokens() {
	    const url = window.location.href;
	    const params = new URLSearchParams(new URL(url).hash.substring(1));
	    this.access_token = params.get('access_token') || '';
	    this.refresh_token = params.get('refresh_token') || '';
	    this.instance_url = params.get('instance_url') || '';
	    this.id = params.get('id') || '';
	    this.issued_at = params.get('issued_at') || '';
	    this.signature = params.get('signature') || '';
	    this.sfdc_community_url = params.get('sfdc_community_url') || '';
	    this.sfdc_community_id = params.get('sfdc_community_id') || '';
	    this.state = params.get('state') || '';
	    this.token_type = params.get('token_type') || '';
	    useCoreStore().setAccessToken(this.access_token);
	},
	async getTimecards() {
	    await http({ url: 'https://d2p000000oizneas.my.salesforce.com/services/apexrest/timecards/v1/?filtertype=TIMECARDSTOAPPROVE' }).then((response) => {
	        console.log('getTimecards', response);
	    }).catch((error) => {
	        console.log('getTimecards', error);
	    });
	},
}
```

These functions match the functions from [Authentication flow using jsforce (old)](#authentication-flow-using-jsforce-(old)), and use our `@wolf/core` so nothing gets stored in cookies or `localstorage` which is not reliable on iOS and Android (can be randomly cleared)

##### Authentication flow using jsforce (old)
1. `jsforce.browser.init()` is called, this function **locally** makes `jsforce` ready to perform further actions. It also checks if there is already an auth token (in the form of a cookie and authenticates further actions).\
It takes a couple of paramaters:\
	- `loginUrl` this is the url that is open in the following step
	- `clientId` this is so salesforce knows what app is loggin in (not really relevant for us but needed and setup by Netivé)
	- `redirectUri` the url that is called after successful authentication (more info in step 4)
	- `scope` What this session has acces to (these are just the same as the old app)
2. `jsforce.browser.login()` is called, with a `loginUrl` paramater (which a user selects, this is `SelectSite`).\
This function wants to open a **new** tab with the url provided so the user can login in the provided site, but in our app we ‌**don't** want a new tab because on android an iOS it will open the browser and not our app.\
To prevent this we change a couple of things:\
	- `jsforce.min.js` wants to call the `window.open()` method, this usually opens a **new tab**, but in some cases this method can be blocked so they provide a backup in the form of `location.href=...` this method changes **the current page** which is what we want so the user sees the correct login page within the app.\
		However Capacitor does not allow this by default, we add `"allowNavigation": [ "localhost", "d2p000000oizneas.my.site.com", "d2p000000oizneas.my.salesforce.com" ]` to the `capacitor.config.json` so that Capacitor allows these domains (this may be expanded with more domains)\
	- To prevent the `window.open()` that `jsforce` tries to call we do the changes described in the #changes section of this README
3. The login window is shown **within the app**.\
We should always try to use the `.my.salesforce.com` domain for loginurls because these login screens are **branded** by the customers of Netivé
4. After authentication is successful salesforce will try to redirect the user (the page) to the url given in the `init()` using the `redirectUri` paramater. In our case the `redirectUri` is a route **in** our app called `Callback.vue` (this may be changed later) this is why `localhost` is also in the `allowNavigation` setting, to allow us to route **back** to our app. This call contains a `Set-Cookie` header which allows us to be authenticated, we however **also** get an auth **token** and a **refresh** token. ⚠️ I don't know why we would need these. This also means that the app has **TWO** entry points:
	- When the user opens the app
	- When we are redirected from the auth page to our app
	this also means that the app is **restarted** at this point like when you would press `ctrl + R`.
5. In `Callback.vue` we also run `jsforce.browser.init(options)` so that it can set the tokens we get back from the `Set-Cookie` header\
6. We can listen if our `browser` is connected by using `jsforce.browser.on('connect', (conn: any) => {})` the `conn` variable is used for further auth calls\
7. We can call api's by using `conn.<api>.get('<apiurl>', (err: any, res: any) => {})`

## Why not use the mobile sdk plugin or other tools of salesforce

Salesforce provides a variety of plugins:
- https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin
- https://www.npmjs.com/package/forcehybrid
- https://github.com/salesforce-marketingcloud/MC-Cordova-Plugin

Unfortunately the first two are only available for Cordova and don't work on Capacitor (we've tried).\
The last one is only for Push notifications.

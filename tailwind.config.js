/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const components = require('@wolf/components/tailwind');
const colors = require('tailwindcss/colors');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/@wolf/components/dist/components/*.vue',
        './docs/guide/**/*.md',
        './docs/guide/**/*.vue',
    ],
    options: {
        safelist: ['html', 'body'],
    },
    theme: {
        extend: {
            colors: {
                // The desging system colors only worked with 400/500/600. The rest of the colors is generated by a tailwind palat generator so that all of the wolf components can be used.
                black: '#05161B',
                primary: {
                    50: '#AECECC',
                    '50-contrast': '#05161B',
                    100: '#A1C7C4',
                    '100-contrast': '#05161B',
                    200: '#88B7B4',
                    '200-contrast': '#05161B',
                    300: '#6FA8A3',
                    '300-contrast': '#05161B',
                    400: '#689F9B',
                    '400-contrast': '#05161B',
                    500: '#4A7B77',
                    '500-contrast': colors.white,
                    600: '#30615D',
                    '600-contrast': colors.white,
                    700: '#203533',
                    '700-contrast': colors.white,
                    800: '#0B1211',
                    '800-contrast': colors.white,
                    900: '#000000',
                    '900-contrast': colors.white,
                    950: '#000000',
                    '950-contrast': colors.white,
                },
                secondary: {
                    50: '#4E5EA8',
                    '50-contrast': colors.white,
                    100: '#48569A',
                    '100-contrast': colors.white,
                    200: '#3B477F',
                    '200-contrast': colors.white,
                    300: '#2E3763',
                    '300-contrast': colors.white,
                    400: '#283057',
                    '400-contrast': colors.white,
                    500: '#14182B',
                    '500-contrast': colors.white,
                    600: '#04050A',
                    '600-contrast': colors.white,
                    700: '#000000',
                    '700-contrast': colors.white,
                    800: '#000000',
                    '800-contrast': colors.white,
                    900: '#000000',
                    '900-contrast': colors.white,
                    950: '#000000',
                    '950-contrast': colors.white,
                },
                gray: {
                    50: '#F3F2F2',
                    '50-contrast': '#05161B',
                    100: '#F3F2F2',
                    '100-contrast': '#05161B',
                    200: '#DDDBDA',
                    '200-contrast': '#05161B',
                    300: '#C9C7C5',
                    '300-contrast': '#05161B',
                    400: '#969492',
                    '400-contrast': '#05161B',
                    500: '#706E6B',
                    '500-contrast': colors.white,
                    600: '#514F4D',
                    '600-contrast': colors.white,
                    700: '#3E3E3C',
                    '700-contrast': colors.white,
                    800: '#1A1919',
                    '800-contrast': colors.white,
                    900: '#000000',
                    '900-contrast': colors.white,
                    950: '#000000',
                    '950-contrast': colors.white,
                },
                danger: {
                    50: '#FF8888',
                    '50-contrast': '#05161B',
                    100: '#FF7373',
                    '100-contrast': '#05161B',
                    200: '#FF4A4A',
                    '200-contrast': '#05161B',
                    300: '#FF2222',
                    '300-contrast': colors.white,
                    400: '#E40010',
                    '400-contrast': colors.white,
                    500: '#CF0000',
                    '500-contrast': colors.white,
                    600: '#C70000',
                    '600-contrast': colors.white,
                    700: '#5F0000',
                    '700-contrast': colors.white,
                    800: '#270000',
                    '800-contrast': colors.white,
                    900: '#000000',
                    '900-contrast': colors.white,
                    950: '#000000',
                    '950-contrast': colors.white,
                },
                warning: {
                    50: '#FCF0DD',
                    '50-contrast': '#05161B',
                    100: '#FAE9CA',
                    '100-contrast': '#05161B',
                    200: '#F7D9A5',
                    '200-contrast': '#05161B',
                    300: '#F3C980',
                    '300-contrast': '#05161B',
                    400: '#f0bf59',
                    '400-contrast': '#05161B',
                    500: '#eca935',
                    '500-contrast': '#05161B',
                    600: '#e4891c',
                    '600-contrast': '#05161B',
                    700: '#A26C0F',
                    '700-contrast': colors.white,
                    800: '#6E4A0A',
                    '800-contrast': colors.white,
                    900: '#3B2706',
                    '900-contrast': colors.white,
                    950: '#211603',
                    '950-contrast': colors.white,
                },
                success: {
                    50: '#91D9A8',
                    '50-contrast': '#05161B',
                    100: '#82D39C',
                    '100-contrast': '#05161B',
                    200: '#64C985',
                    '200-contrast': '#05161B',
                    300: '#45BE6D',
                    '300-contrast': '#05161B',
                    400: '#3BA755',
                    '400-contrast': colors.white,
                    500: '#2E844A',
                    '500-contrast': colors.white,
                    600: '#396547',
                    '600-contrast': colors.white,
                    700: '#11311B',
                    '700-contrast': colors.white,
                    800: '#030704',
                    '800-contrast': colors.white,
                    900: '#000000',
                    '900-contrast': colors.white,
                    950: '#000000',
                    '950-contrast': colors.white,
                },
            },
            fontSize: {
                1: ['0.625rem', '0.75rem'],
                2: ['0.75rem', '0.9rem'],
                3: ['0.8125rem', '0.975rem'],
                4: ['0.875rem', '1.05rem'],
                5: ['1rem', '1.2rem'],
                6: ['1.125rem', '1.35rem'],
                7: ['1.25rem', '1.5rem'],
                8: ['1.5rem', '1.8rem'],
                9: ['1.75rem', '2.1rem'],
                10: ['2rem', '2.4rem'],
                11: ['2.625rem', '3.15rem'],
            },
            zIndex: {
                'rounded-background': '-10',
            },
            boxShadow: {
                full: '0 0 0 100vh rgba(0, 0, 0, 0.4)',
            },
        },
    },
    plugins: [
        // Example: `ionic-text-red-500` automatically sets `--color: theme('colors.red.500')`
        plugin(
            ({ matchUtilities, theme }) => {
                matchUtilities(
                    { 'ionic-text': (value) => ({ '--color': value }) },
                    { values: flattenColorPalette(theme('colors')), type: ['color', 'any'] },
                );
            },
        ),
        // Example: `ionic-text-red-500` automatically sets `--color: theme('colors.red.500')`
        plugin(
            ({ matchUtilities, theme }) => {
                matchUtilities(
                    { 'ionic-bg': (value) => ({ '--background': value }) },
                    { values: flattenColorPalette(theme('colors')), type: ['color', 'any'] },
                );
            },
        ),
        components,
        forms,
    ],
};

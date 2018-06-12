const parseArgs = require('minimist');
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port',
  },
  string: ['H'],
  unknown: parameter => false,
});

const port =
    argv.port ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    '3000';
const host =
    argv.hostname ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    'localhost';
module.exports = {
  env: {
    baseUrl:
    process.env.BASE_URL ||
    `http://${host}:${port}`,
  },
  head: {
    title: 'tt1',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content:
            'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  css: [
    {src: 'todomvc-app-css/index.css'}
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  //css: ['todomvc-app-css/index.css'],
  build: {},
  modules: [
    '@nuxtjs/axios',
    '~/modules/typescript.js',
  ],
  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  axios: {},
};

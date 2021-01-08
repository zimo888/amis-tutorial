
const scssCompile = `npx node-sass src/scss/default.scss -o snowpack/css --importer=node_modules/node-sass-tilde-importer`;

module.exports = {
  mount: {
    snowpack: '/',
    src: '/_dist_'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    ['@snowpack/plugin-run-script', { name: 'scss compile', cmd: scssCompile }],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
  },
  devOptions: {
    /* ... */
  },  
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
  }
};

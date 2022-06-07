const CracoLessPlugin = require('craco-less');
// import CracoLessPlugin from "craco-less";

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#717171',
              '@layout-body-background': '#FFFFFF',
              '@layout-header-background': '#B4B4B4',
              '@layout-trigger-background': '#B4B4B4',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
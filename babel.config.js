module.exports = {
  presets: [
    "@vant/cli/preset",
    ["@babel/preset-env", { "modules": false }],
    // "@vue/cli-plugin-babel/preset",
    // [
    //   '@vue/babel-preset-jsx',
    //   {
    //     'injectH': false
    //   }
    // ],
    // [ "@vue/app", { useBuiltIns: "entry" } ],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
      'element-ui',
    ],
  ],
  sourceType: "unambiguous",
};

module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "Waktu Sembahyang Brunei",
    themeColor: '#455A64',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: "Waktu Sembahyang Brunei",
      short_name: 'WSB',
      start_url: '/',
      scope: '/',
      display: "standalone",
      orientation: "portrait-primary",
      theme_color: "#455A64",
      background_color: "#78909C",
      icons: [
        {
          "src": "/img/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/img/icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: '/service-worker.js',
        exclude: [/\.map$/, "_redirects"],
      }
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
};

import {defineConfig, loadEnv, PluginOption} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";
import handlebars from 'vite-plugin-handlebars'


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 9000,
    },
    build: {
      outDir: "build",
      rollupOptions: {
        input: {
          index: "./index.html",
          "microfrontend-config": "./src/microfrontend-config.ts"
        },
        output: {
          format: "system",
          entryFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          globals: {
            react: "react",
            "react-dom": "reactDOM",
            'single-spa': 'singleSpa',
            'single-spa-layout': 'singleSpaLayout'
          },
        },
        preserveEntrySignatures: "strict",
      },
    },
    plugins: [
      handlebars({
        context: {
          isLocal: mode === 'development'
        }
      }) as unknown as PluginOption,
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/react/umd/react.production.min.js',
            dest: 'libs',
          },
          {
            src: 'node_modules/react-dom/umd/react-dom.production.min.js',
            dest: 'libs',
          },
          {
            src: 'node_modules/systemjs/dist/system.min.js',
            dest: 'libs',
          },
          {
            src: 'node_modules/systemjs/dist/extras/amd.min.js',
            dest: 'libs',
          }
        ]
      })
    ]
  };
});

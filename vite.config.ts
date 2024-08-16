import {defineConfig, loadEnv} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 9000,
    },
    build: {
      outDir: "build",
      target: "esnext",
    },
    plugins: [
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
      }),
      vitePluginSingleSpa({
        type: "root",
        importMaps: {
          dev: ['./src/importmap-apps.dev.json', './src/importmap-deps.dev.json'],
          build: ['./src/importmap-apps.json', './src/importmap-deps.json'],
        },
      }),
    ]
  };
});

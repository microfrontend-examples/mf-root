import {
    constructRoutes,
    constructApplications,
    constructLayoutEngine,
} from "single-spa-layout";
import { registerApplication, start } from "single-spa";
import microfrontendLayout from './microfrontend-layout.html?raw';

const routes = constructRoutes(
    microfrontendLayout, {
        props: {},
        loaders: {
            loadingComponent: `
          <div class="progress-loader__container">
            <div class="progress-loader">
              <p>Preparing your app</p>
              <progress class="pure-material-progress-linear"/>
            </div>
          </div>
        `,
        },
        errors: {
            errorComponent: `
          <div class="failed-mount-component">
            <h1>Failed to load your app :(</h1>
          </div>
        `,
        }
    }
);

const applications = constructApplications({
    routes,
    loadApp: ({ name }) => import(/* @vite-ignore */ name),
});

const layoutEngine = constructLayoutEngine({
    routes,
    applications,
    active: false,
});

applications.forEach(registerApplication);

layoutEngine.activate();
start();

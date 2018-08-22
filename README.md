# BitBrew Console

Console for BitBrew's second-generation connected vehicle platform.

## Supported Browsers

We aim to support most modern browsers, which currently includes:

- [Chrome](https://www.google.com/chrome/)
- [Edge](https://www.microsoft.com/en-us/windows/microsoft-edge)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Opera](http://www.opera.com/)
- [Safari](https://www.apple.com/safari/)

**Please note that Internet Explorer is not on this list!**

We officially support the last 3 versions of each browser listed. The app may work in other browsers and versions, but it's not guaranteed.

## Project Overview

This app uses a few pieces of tech worth highlighting:

- [React](https://reactjs.org/) powers the app.
- [axios](https://github.com/axios/axios) is used to make HTTP requests.
- [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) is used for state management.
- [Reach Router](https://reach.tech/router) is used for routing.
- [React Loadable](https://github.com/jamiebuilds/react-loadable) is used for code splitting.
- [react-modal](http://reactcommunity.org/react-modal/) is used to create accessible modals.
- [styled-components](https://www.styled-components.com/) is used to write styles.

Other noteable tooling includes:

- [Browserslist](https://github.com/ai/browserslist) keeps a centralized list of supported browsers that can be accessed across tools.
- [Babel](http://babeljs.io/) compiles future JavaScript to current, well-supported JavaScript.
- [ESLint](https://eslint.org/) and [stylelint](https://stylelint.io/) check for errors and consistent code style.
- [Prettier](https://prettier.io/) automatically formats a variety of file types, allowing for consistent code formatting throughout the project.
- [webpack](https://webpack.js.org/) builds the app.

Additional libraries are used as necessary but aren't listed here to keep the length reasonable. You can always find them in the [`package.json`](package.json) file.

## Development Workflow

Before you can start developing, you'll need to run `git clone git@github.com:BitBrew/console.git` to copy the repository to your computer.

After cloning your repo, you'll want to navigate into the repository folder and run `yarn install` to download the project's dependencies.

> **Note:** Yarn is a package for managing dependencies, much like npm. You could use npm instead, but then Yarn wouldn't track any changes to dependencies in the `yarn.lock` file. So, just go ahead and use Yarn for everything in this project. It's recommended to install Yarn using an OS-specific method (e.g., `brew install yarn`), but you can install it via npm, too (i.e., `npm install --global yarn`).

Once you've installed the dependencies, you can make use of the available npm scripts to help you develop the app by running `yarn <SCRIPT_NAME>` in your terminal. You can always find the entire list of scripts in the [`package.json`](package.json) file, but some useful ones are:

- `build`: Builds a production version of the app that is suitable for deployment.
- `check:css`: Runs Stylelint on all the CSS (styled-components) in the project.
- `check:format`: Lists any files that aren't formatted as Prettier would like them to be.
- `check:js`: Runs ESLint on all the JavaScript in the project.
- `ci`: Runs all checks and builds the app if they pass.
- `format`: Runs Prettier on all project files supported by Prettier.
- `start`: Serves a development version of the app locally at the URLs listed in the terminal.

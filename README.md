# GEOLOCO - The Visualization tool for Socialogy
In this project we have created a tool for visualizing global Socialogy data from the Numbeo API using a worldmap.


## What we have done
We have created an application where we show data on a country by country basis using a heatmap of the world.
The heatmap is created using the [Datamaps](https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started) library and relies heavily on d3.js.
The data of each country in the model is fetched from the external API:  https://www.numbeo.com/api/country_indices?api_key=api-key&country=country-name.
We have Implemented the MVP architecture where we use Redux as the model. We have also included third party components like the React select component used in the `SelectorPresenter`.
Additionally, Firebase was implemented for persistence. In fact, persistence is not very important for this project particularly, but we implemented it since it was one of the requirements in the grading criteria.

Finally, we removed all the warnings that popped up in the console while running the application. The application is warning free from our side but there is a single warning coming which is coming form an internal function in the firebase library. This warning we could not fix as it lies in the internals of firebase library.



## Project structure 

### Model folder
This folder contains everythin related to the model part of our project. We use redux to maintain our state. Most of the reducers contain simple high level functions that update the state.
But in the mapReducer we have two important functions that are a little more complex than those in the other reducers, the renderMap and ResetMapZooming functions. The first one uses the datamaps library to render the map view.
The second one is used to reset the zooming and stretching that a user can do within the map.


### Presenter folder
This folder contains all the presenters for our project.


### Views folder
This folder contains all the views for our project. Worth mentioning is that the "map view" is rendered through the datamaps library that inserts the svg element into the `<div id="map" className="world-map"/>` in the mapPresenter.js. 

### Persistance
* **firebaseConfig.js** and **firebaseModel.js** is used to set up a simple firebase connection, the database is exported in firebaseModel.js. Firebase is used to store the current index the user is looking at. It is fetched and set as the initial state in the selectorReducer.js and is posted to firebase from the selectorPresenter.js

### Others
* **colorConfig.js**, **countryCodes.js**, **criteria.js**, **criteriaInfo.js** are all config files containing various constant data used in the project.
* **api-config.json** and **api-handler.js** is used for fetching data from the Numbeo API.
* **action.js** contains two functions. One thunk action used for fetching all the initial data from the Numbeo API, and another function for updating the color settings in the store which will affect the map and the color gradient.



## Installation
In the root of the project run `npm install` to install all the required dependencies from the package.json file. 


### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

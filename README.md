# GEOLOCO - The Visualization tool for Socialogy
In this project we have created a tool for visualizing global Socialogy data from the Numbeo API using a worldmap. 


## What we have done 
Thus far we have created the main page where we show data on a country by country basis using a heatmap of the world. 
The heatmap is created using the [Datamaps](https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started) library and relies heavily on d3.js.
The data in the model is fetched from https://www.numbeo.com/api/country_indices?api_key=api-key&country=country-name for each country.

## What we are going to do
* Add some sort of side component with information about what the different data represents. i.e what does a Crime index of 52.5 mean.
* We want to add another view where we can view the same data for each city within a given country. Clicking an country should take the user to this new view.


## Project structure - file description
* **colorGradientComponent:** This component (which currently looks horrible css wise) is used to show what the different colors represents. Atm by default we assume that all the data points currently implemented are in the range [0,100], this should be dynamically set based on the data.
* **MapComponent:** This component shows the map component, currently only shows the data on a country-by-country basis by coloring the map based on the category selected.
* **MapPresenter:** Modifies the data from the model to set colors based on the selected category and the data associated with each country. Currently this coponent has functionality that probably should be relocated to the models.  
* **DBCountriesModel:** Is part of the model where we store the data of each country.
* **SelectorModel:** Is part of the model that will store the data for the selection element.
* **MetaDataModel:** Is part of the model that will store the settings required for the map.



## (installation and react) Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

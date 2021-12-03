import logo from './logo.svg';
import './App.css';
import ApiHandler from './api-handler'
import MapPresenter from './mapPresenter';


function App() {
  // ApiHandler.getCities("Sweden");
  return (
    <div className="App">
      <MapPresenter/>
    </div>
  );
}

export default App;

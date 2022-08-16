import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import ActivityCreate from "./components/ActivityCreate.jsx";
import CountryDetail from "./components/CountryDetail.jsx";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/details/:id" component={CountryDetail}/>
        <Route path="/activities" component={ActivityCreate}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

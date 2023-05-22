import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Routing/Router";

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    );
  }
}

export default App;
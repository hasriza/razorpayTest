import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products.jsx";
import { createBrowserHistory } from "history";
import { products } from "./components/products";
import "babel-polyfill";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Products products={products} history={history} />}
        />
      </Switch>
    </Router>
  );
};

export default App;

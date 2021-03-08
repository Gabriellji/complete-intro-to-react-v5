import { Link, Router } from "@reach/router";
import React, { Suspense, lazy, useState } from "react";

import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import('./Details'))

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Suspense fallback={<h1>Loading route...</h1>}>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Header from "./containers/Header";
import Login from "./components/Login";

import Main from "./containers/Main";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // When component mounts, hit '/api/auth/verify'
  // // check if they are logged in
  useEffect(() => {
    axios.get("/api/auth/verify").then(({ data }) => {
      // if they're loggedIn, set our logged in state to true
      if (data.isLoggedIn) setIsLoggedIn(true);
      setIsLoading(false);
    });
  }, []);

  if (isLoggedIn === false) {
    return <Login />;
  }

  return (
      <>
        <Header />
        <Main />
      </>
  );
}
export default App;

import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Header from './AppChildren/Header.jsx';
import Login from './Login.jsx';
// import child components
// import Body from './AppChildren/Body.jsx'
// import Footer from './AppChildren/BodyChildren/Footer.jsx'
import styles from '../styles.css';
import Form from './AppChildren/BodyChildren/Form.jsx';

function App() {
  // const [ isLoading, setIsLoading ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  // // When component mounts, hit '/api/auth/verify'
  // // check if they are logged in
  // useEffect(() => {
  //   axios.get('/api/auth/verify')
  //     .then(({ isLoggedIn }) => {
  //       // if they're loggedIn, set our logged in state to true
  //       if (isLoggedIn) setIsLoggedIn(true);
  //       setIsLoading(false);
  //     })
  // }, []);

  return (
    <div>
      {
        // // if loading, display loading page
        // isLoading?
        // <p>...Loading</p>
        // :
        // if logged in, display header, and form
        isLoggedIn ? 
        <>
          <Header />
          <Form />
        </>
        :
        // else display login page
        <Login setIsLoggedIn={setIsLoggedIn} />
      }
    </div>
  );
}
export default App;

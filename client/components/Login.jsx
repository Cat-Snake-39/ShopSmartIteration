import React from 'react';
import smartShopLogo from '../images/smartShopLogo.png';

const Login = (props) => {
  return (
    <>
      <h1 className="opener">Welcome to</h1>
      <h1 className="opener">
        <img className='shopSmartLogo' src={smartShopLogo} />
      </h1>
      <h3 className="open">Sign In To Review Your Shopping Lists Or Continue As Guest</h3>
      <div className="intro">
        <button className="gotomiddle"><a className="atag" href="#middle" onClick={() => props.setIsLoggedIn(true)}>Continue as Guest</a></button>
        <form className="login__form" method="GET" action="/api/auth/oauth">
          <button className="gotomiddle" type="submit">Github Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

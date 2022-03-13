import axios from "axios";
import React, { useRef } from "react";
import "./register.css";
import { useHistory, Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords Don't Match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GaneshSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on GaneshSocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              minLength={6}
              required
              ref={password}
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              minLength={6}
              required
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Register
            </button>
            <Link to="/login" className="loginRegisterButton">
              <button type="button" className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

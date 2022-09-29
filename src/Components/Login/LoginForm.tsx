import React, { useEffect, useState } from "react";
import { apiValidateLogin, register, userInfoLogin } from "../../Slices/UserSlice";
import { userLogin } from "../../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar"

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo.token);
    console.log(username);
    console.log(password);
    console.log(userInfo.loggedIn);
  }, [userInfo]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let info: register = {
      username: username,
      password: password,
    };
    dispatch(userLogin(info));
    dispatch(userInfoLogin(info));
    navigate("/");
  };
  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    // let use: any = userInfo.token;
    // dispatch(apiValidateLogin(use));

    navigate("/register");
  };
  return (
    <>
    <Navbar/>
    <div className="login">
      <h1 className="login-header">Login</h1>
      <form className="login-form">
        <div className="input-name">
          <label className="username-label">Username:</label>
          <input
            placeholder="username"
            type="text"
            className="username"
            value={username}
            name="username"
            onChange={handleInput}
            required
          />
        </div>
        <div className="input-passwrd">
          <label className="password-label">Password:</label>
          <input
            placeholder="password"
            type="password"
            className="password"
            value={password}
            name="password"
            onChange={handleInput}
            required
          />
        </div>
      </form>
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
    </>
  );
};

import * as React from "react";
import { Navigate } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { userLogout } from "../../Slices/UserSlice";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/login");
  }

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(userLogout(userInfo.token));
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="logo" title="img">
        {" "}
        <img
          src="https://cdn-icons-png.flaticon.com/512/566/566294.png"
          alt="tictactoe logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="header" title="header">
        Tic Tac Toe
      </div>
      <div className="wrap">
        {!userInfo.loggedIn? ( <button className="btn" title="login" onClick= {handleLogin}>
          Login
        </button> ) :
        
        (<button className="btn" title="logout" onClick= {handleLogout}>
        Logout
      </button> )}
       
      </div>
    </nav>
  );
};

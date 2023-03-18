import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn,selectUserData,setInput,setSignedIn,setUserData} from "../reducers";
 import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const[c,setC]=useState(1);

  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
    setC(2)
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">Hi There!</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
          <h>{c}</h>
          
        </div>
      )}
<button className="submit" onClick={handleClick}>
            Add New Blog
          </button>
      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar className="user" src={userData?.imageUrl} alt={userData?.name}/>
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="57529085775-fk8rn8hren1q8o5ja2idq4m7hug5aong.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">User not available!</h1>
      )}
    </div>
  );
};

export default Navbar;
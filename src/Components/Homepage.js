import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../reducers";

import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);

  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

    return (
        <div className="home_page" style={{ display: isSignedIn ? "none" : "" }}>
          {!isSignedIn ? (
            <div className="login_msg">
              <h2>📚</h2>
              <h1>A Readers Favourite Place!</h1>
            <p>
                Welcome!<br/>
                Enjoy reading quality blogs!
            </p>
            <GoogleLogin
            clientId = "499487737806-nr8ts349rcloi3p551v50khc599kad58.apps.googleusercontent.com"
            render={(renderProps) => (
                <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login_button"

                >
                    Login with Google
                </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}

            />
            </div>
            ) : (
              ""
            )}
          </div>
        );
      };
      
    export default Homepage;
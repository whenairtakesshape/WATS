// css styles
import "./css/adminWindow.scss";

// assets
import logout from "../assets/logout.svg";

// libraries
import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { useState, useRef, useContext, useEffect } from "react";

// components
import { Debugger } from "./Debugger";
import { AuthenticationContext } from "../contexts/AuthenticationContext";


export const AdminWindow = () => {

  // authenticated global state.
  // used to determine if user has been authenticated
  const { authenticated, setAuthenticated } = useContext(AuthenticationContext);

  // adminAuthWindow global state.
  // used to determine if admin window should render.
  const { adminAuthWindow, setAdminAuthWindow } = useContext(AuthenticationContext);

  // password state used to record user's input.
  const [password, setPassword] = useState("");

  // label for password input. used to render "Password" or "Contacting Server..." or 
  // "Incorrect Password" above the password input.
  const [passwordLabelState, setPasswordLabelState] = useState("Password");

  // ref to password input element where user inputs password.
  const passwordInputElement = useRef() as React.MutableRefObject<HTMLInputElement>;
  // ref to password label element that sits right above the password input element.
  const passwordLabel = useRef() as React.MutableRefObject<HTMLInputElement>;

  /**
   * contacts server to authenticate user
   */
  let getAdminAuth = async () => {

    // color of passwordLabel changes
    passwordLabel.current.style.color = "black";
    // while server loads, change passswordLabelState to this
    setPasswordLabelState("Contacting Server...");


    // make request to server with input from user
    try {
      const res: AxiosResponse<any, any> = await axios.post(`http://localhost:3001/admin`,
        {
          username: "Admin",
          password: password
        }
      );
      // if user was not authenticated, set passwordLabelState to "Incorrect Password" in red to notify user.
      // setTimeout is used to make render of passwordLabelState more smooth.
      console.log(res);
      if (!res.data) {
        if (passwordInputElement && passwordInputElement.current) {
          setTimeout(() => {
            setPasswordLabelState("Incorrect Password");
            passwordLabel.current.style.color = "red";
            passwordInputElement.current.focus();
          }, 1000);
        }
        // if user is authenticated, set authenticated to true.
        // again setTimeout is used to make render of passwordLabelState more smooth.
      } else {
        setTimeout(() => {
          setAuthenticated(res.data);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error)
      // if contacting server produces error, display error message in passwordLabelState
      if (passwordInputElement && passwordInputElement.current) {
        passwordLabel.current.style.color = "red";
        passwordInputElement.current.focus();
        setPasswordLabelState(error.message);
      }
    }
  };

  // LATER FUNCTIONALITY TO MAKE REQUEST TO SERVER WITH ENTER 
  // /**
  //  * triggers getAdminAuth if user hits enter
  //  * @param keyboard event
  //  */
  // function submit(event: KeyboardEvent): void {
  //   if (event.key === 'Enter') {
  //     getAdminAuth();
  //   }
  // };

  // // listen for keydown event.
  // // trigger submit if keydown event is dispatched.
  // // removes event listener once it has dispatched.
  // useEffect(() => {
  //   window.addEventListener("keydown", (event: KeyboardEvent) => submit(event));
  //   return () => {
  //     window.removeEventListener("keydown", (event: KeyboardEvent) => submit(event));
  //   };
  // }, []);

  return (
    <div className="admin-window-container">
      {/** if user is authenticted, debugger renders, otherwise admin-window-container-login renders.*/}

      {authenticated ?

        <Debugger /> :

        <div className="admin-window-container-login">
          <div className="admin-window-container-login-x"
            onClick={() => setAdminAuthWindow(false)}>x</div>
          <div
            className="admin-window-container-login-header">
            <p>Admin</p>
          </div>
          <div className="admin-window-container-login-username">
            <p>Username</p>
            <input type="text" readOnly placeholder="Admin" ></input>
          </div>
          <div className="admin-window-container-login-password">
            <p ref={passwordLabel}>{passwordLabelState}</p>
            <input
              type="password"
              placeholder="Enter Password"
              ref={passwordInputElement}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}>
            </input>
          </div>
          <button onClick={() => getAdminAuth()}> Submit</button>
        </div>

      }
    </div >
  );
};
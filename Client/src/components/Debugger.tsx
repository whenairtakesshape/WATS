// css styles import
import "./css/debugger.scss";

// assets
import logout from "../assets/logout.svg";

// libraries import 
import { useContext, useState } from 'react';
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import axios from "axios";

export function Debugger() {
  // authenticated global state
  const { authenticated, setAuthenticated } = useContext(AuthenticationContext);
  // adminAuthWindow global state
  const { adminAuthWindow, setAdminAuthWindow } = useContext(AuthenticationContext);

  const [serverResponse, setServerResponse] = useState("");
  const [request, setRequest] = useState("");

  async function sendCommand(command: string) {
    setRequest(command);
    setServerResponse("Contacting server...");
    try {
      const res = await axios.post(`http://localhost:3001/command?command=` + command);
      setTimeout(() => {
        setServerResponse(res.statusText);
      }, 1000);
      console.log(res);
      //alert(res.statusText);
    }
    catch (error: any) {
      setTimeout(() => {
        setServerResponse(error.message);
      }, 1000);
      //alert(error.message);
      console.error(error);
    }
  }

  // function sendCommand(command: string) {
  //     fetch('http://localhost:3001/command?command=' + command, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',

  //       },
  //     })
  //       .then(res => res.json());
  //   }

  return (
    <div className="debugger-container">
      {/** header */}
      <div className="debugger-container-header">
        <p>Controls</p>
        <div
          className="debugger-container-header-logout"
          onClick={() => {
            setAuthenticated(false);
            setAdminAuthWindow(false);
          }}
        >
          <img src={logout} />
          <p>Logout</p>
        </div>
      </div>
      {/** button sections */}
      <div className="debugger-container-sections">
        <div className="debugger-container-section">
          <button onClick={() => sendCommand("r")}>Reset</button>
          <button onClick={() => sendCommand("e")}>Expand</button>
          <button onClick={() => sendCommand("c")}>Contract</button>
        </div>
        <div className="debugger-container-section">
          <button onClick={() => sendCommand("n")}>Step Expansion</button>
          <button onClick={() => sendCommand("m")}>Step Contraction</button>
          <button onClick={() => sendCommand("q")}>CW Rotation</button>
        </div>
        <div className="debugger-container-section">
          <button onClick={() => sendCommand("w")}>CCW Rotation</button>
          <button onClick={() => sendCommand("s")}>Stop</button>
        </div>
      </div>
      <div
        className="debugger-container-server-response"
        style={{ color: serverResponse == "Network Error" ? "red" : "black" }}>
        Server Response: {serverResponse}
      </div>
      <div className="debugger-container-server-response">
        Command Sent: <b>{request}</b>
      </div>
    </div>
  );
}



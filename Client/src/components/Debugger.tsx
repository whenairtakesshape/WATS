// css styles import
import "./css/debugger.scss";

// assets
import logout from "../assets/logout.svg";

// libraries import 
import { useContext } from 'react';
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export function Debugger() {
  // authenticated global state
  const { authenticated, setAuthenticated } = useContext(AuthenticationContext);
  // adminAuthWindow global state
  const { adminAuthWindow, setAdminAuthWindow } = useContext(AuthenticationContext);

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
    </div>
  );
}

function sendCommand(command: string) {
  fetch('http://localhost:3001/command?command=' + command, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    },
  })
    .then(res => res.json());
}


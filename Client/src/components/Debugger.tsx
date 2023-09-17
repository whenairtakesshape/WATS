// css styles import
import "./css/debugger.css";

// libraries import 
import React from 'react';

export function Debugger() {
  return (
    <div>
      <ul id="debugger-buttons">
      <li><button onClick={() => sendCommand("r")}>Reset</button></li>
      <li><button onClick={() => sendCommand("e")}>Expand</button></li>
      <li><button onClick={() => sendCommand("c")}>Contract</button></li>
      <li><button onClick={() => sendCommand("n")}>Step Expansion</button></li>
      <li><button onClick={() => sendCommand("m")}>Step Contraction</button></li>
      <li><button onClick={() => sendCommand("q")}>CW Rotation</button></li>
      <li><button onClick={() => sendCommand("w")}>CCW Rotation</button></li>
      <li><button onClick={() => sendCommand("s")}>Stop</button></li>
      </ul>
    </div>
  );
}

function sendCommand(command: string) {
    fetch('http://localhost:3001/command?command='+command, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  
    },
  })
    .then(res => res.json());
}


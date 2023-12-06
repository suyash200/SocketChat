import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./socket";
import { msgContext } from "./context/context";
import PutMessage from "./components/PutMessage";

function App() {
  const [NameDailog, setNameDailog] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [msgList, setMsgList] = useState([]);

  const updater = (val) => {
    setMsgList([...msgList, val]);
  };

  socket.off("receive").on("receive", (val) => {
    console.log(val);
    updater(val);
  });

  // console.log(socket);

  return (
    <msgContext.Provider value={name}>
      <div className="App">
        <header className="App-header">
          <h1 style={{ filter: NameDailog ? "blur(5px)" : "none" }}>
            {" "}
            Welcome {name}
          </h1>

          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ filter: NameDailog ? "blur(5px)" : "none" }}
          />
          <ul style={{ filter: NameDailog ? "blur(5px)" : "none" }}>
            {msgList.map((data, index) => {
              console.log(data);
              return (
                <div key={index} style={{ display: "flex" }}>
                  {data.name}: {data.msg}
                </div>
              );
            })}
          </ul>
          {NameDailog && NameDailog ? (
            <dialog open={NameDailog} className="dailogBox">
              <div className="dailogInner">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNameDailog(false);
                  }}
                >
                  Set
                </button>
              </div>
            </dialog>
          ) : null}
          <div style={{ filter: NameDailog ? "blur(5px)" : "none" }}>
            <PutMessage />

            <p>Websocket based live chat app for groups</p>
          </div>
        </header>
      </div>
    </msgContext.Provider>
  );
}

export default App;

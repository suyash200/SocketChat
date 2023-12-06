import React, { useContext, useState } from "react";
import { msgContext } from "../context/context";

export default function PutMessage() {
  const [message, setmessage] = React.useState("");
  const name = useContext(msgContext);

  const eventHandler = async () => {
    await fetch("http://localhost:4000/", {
      method: "post",
      body: JSON.stringify({
        msg: message,
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            eventHandler();
          }
        }}
        type="text"
        style={{ height: "30px", width: "400" }}
        value={message}
        onChange={(e) => {
          e.preventDefault();
          setmessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          eventHandler();
        }}
      >
        Send Message
      </button>
    </div>
  );
}

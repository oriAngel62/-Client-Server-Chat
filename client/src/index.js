import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routing from "./Routing/Routing";

ReactDOM.render(
    <React.StrictMode>
        <header></header>
        <main>
            <Routing />
        </main>
        <footer></footer>{" "}
    </React.StrictMode>,
    document.getElementById("root")
);

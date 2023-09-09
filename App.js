import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am an h1 tag"),
    React.createElement("h2", {}, "I am an h2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am an h1 tag"),
    React.createElement("h2", {}, "I am an h2 tag"),
  ]),
]);

const arrayOfSiblingsInsideParent = React.createElement(
  "div",
  { id: "parent" },
  [
    React.createElement("h1", {}, "Hello World"),
    React.createElement("h2", {}, "Hello World"),
    React.createElement("h3", {}, "Hello World"),
    React.createElement("h4", {}, "Hello World"),
    React.createElement("h5", {}, "Hello World"),
    React.createElement("h6", {}, "Hello World"),
  ]
);

console.log(parent); // object

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);

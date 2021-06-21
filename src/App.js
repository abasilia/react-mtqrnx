import React from "react";
import "./style.css";


const keys = [
  { name: "clear", value: "AC", entry: "", type: "clear" },
  { name: "divide", value: "/", entry: "/", type: "operation" },
  { name: "multiply", value: "x", entry: "*", type: "operation" },
  { name: "seven", value: "7", entry: "7", type: "number" },
  { name: "eight", value: "8", entry: "8", type: "number" },
  { name: "nine", value: "9", entry: "9", type: "number" },
  { name: "subtract", value: "-", entry: "-", type: "operation" },
  { name: "four", value: "4", entry: "4", type: "number" },
  { name: "five", value: "5", entry: "5", type: "number" },
  { name: "six", value: "6", entry: "6", type: "number" },
  { name: "add", value: "+", entry: "+", type: "operation" },
  { name: "one", value: "1", entry: "1", type: "number" },
  { name: "two", value: "2", entry: "2", type: "number" },
  { name: "three", value: "3", entry: "3", type: "number" },
  { name: "equals", value: "=", entry: "", type: "equals" },
  { name: "zero", value: "0", entry: "0", type: "zero" },
  { name: "decimal", value: ".", entry: ".", type: "decimal" }
];

const Button = (props) => {
  const clickon = () => {
    let num = "" + props.expNum;
    let exp = "" + props.expression;

    if (
      (props.entry === "+" || props.entry === "*" || props.entry === "/") &&
      (exp.charAt(exp.length - 1) === "+" ||
        exp.charAt(exp.length - 1) === "*" ||
        exp.charAt(exp.length - 1) === "/" ||
        exp.charAt(exp.length - 1) === "-")
    ) {
      exp = exp.slice(0, -1);
    }
    if (
      (num === "+" || num === "-" || num === "*" || num === "/") &&
      props.operation === "decimal"
    ) {
      num = num + "0";
    }
    if (props.name === "clear") {
      num = "0";
      exp = "0";
    } else if (
      num === "0" &&
      props.operation != "operation" &&
      props.operation != "decimal"
    ) {
      num = props.entry;
      exp = props.entry;
    } else if (props.name === "equals") {
      function calc(obj) {
        return Function('"use strict";return (' + obj + ")")();
      }
      num = calc(exp);
      exp = calc(exp);
      let textNum = num.toString();
      if (textNum.indexOf(".") > -1) {
        let prec = textNum.split(".");
        if (prec[1].length > 6) {
          num = num.toFixed(6);
          exp = exp.toFixed(6);
        }
      }
    } else if (props.operation === "operation") {
      num = props.entry;
      exp = exp + props.entry;
    } else if (num.length > 14) {
      num = num;
      exp = exp;
      alert("Limit on digits is reached");
    } else {
      num = num + props.entry;
      exp = exp + props.entry;
    }
    if (props.entry === "-" && exp.charAt(exp.length - 2) === "-") {
      exp = exp.slice(0, -1).slice(0, -1) + "+";
      num = "+";
    }
    exp = exp + "";
    let lst = exp.charAt(exp.length - 1);
    let plst = exp.charAt(exp.length - 2);

    if (
      (lst === "*" || lst === "+" || lst === "/") &&
      (plst === "*" || plst === "+" || plst === "/")
    ) {
      exp = exp.slice(0, -1).slice(0, -1) + lst;
    }
    num = num + "";
    let indecies = [];
    let array = num.split("");
    let element = ".";
    let idx = array.indexOf(element);
    while (idx != -1) {
      indecies.push(idx);
      idx = array.indexOf(element, idx + 1);
    }

    if (indecies.length > 1) {
      num = num.slice(0, -1);
      exp = exp.slice(0, -1);
    }
    props.numUpdate(num);
    props.formUpdate(exp);
  };

  return (
    <button
      key={props.key}
      id={props.name}
      entry={props.entry}
      operation={props.operation}
      onClick={clickon}
    >
      {props.value}
    </button>
  );
};

const App = () => {
  const [enteredFormula, setEnteredFormula] = React.useState("0");
  const [enteredNumber, setEnteredNumber] = React.useState("0");

  return (
    <div id="calculator">
      <div id="displays">
        <div id="formulas">{enteredFormula}</div>
        <div id="display">{enteredNumber}</div>
      </div>
      <div id="keypad">
        {keys.map((key) => (
          <Button
            key={key.name}
            name={key.name}
            entry={key.entry}
            operation={key.type}
            value={key.value}
            expression={enteredFormula}
            expNum={enteredNumber}
            formUpdate={setEnteredFormula}
            numUpdate={setEnteredNumber}
          />
        ))}
      </div>
    </div>
  );
};


export default App;

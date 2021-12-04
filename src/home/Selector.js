import React from "react";
import "./Home.css";

function Selector(props) {
  return (
    <div>
      <select className="selector" onChange={(e) => console.log("Country:", e)}>
        <option className="selector-text">{props.title}</option>
        {/*   {props.options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))} */}
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>
        <option>Sweden</option>

        <option>Sweden</option>
      </select>
    </div>
  );
}

export default Selector;

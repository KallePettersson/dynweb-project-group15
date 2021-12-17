import React from "react";
import "./Home.css";

function Header() {
  return (
    <div className="header">
      <h1 className="header-text">GEOLOCO - </h1>
      <h1 className="header-text-small">
        &nbsp; the visualization tool for sociology
      </h1>
      <div className="christmas-gif">
        <iframe
          src="https://giphy.com/embed/qvbGIuX6Mkg8pP2lLT"
          width="80"
          height="80"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/hypeenergydrinks-santa-hype-energy-qvbGIuX6Mkg8pP2lLT">
            via GIPHY
          </a>
        </p>
      </div>
    </div>
  );
}

export default Header;

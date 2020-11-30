import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ title, size, imageUrl }) => (
  <div className={`${size} menu-item`}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
    <div className="content">
      <h1 className="title"> {title.toUpperCase()} </h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;

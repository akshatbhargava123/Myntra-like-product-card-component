import React, { Component } from "react";
import "antd/dist/antd.css";
import ProductCard from "./ProductCard";

class App extends Component {
  render() {
    return (
      <div style={{ background: "#FFFFFF", padding: "30px" }}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    );
  }
}

export default App;

import React from "react";
import "./ProductCard.css";
import { Icon } from "antd";

const link =
  "https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/7713774/2018/11/27/2fb59bfa-0e42-443c-a201-58429f49e32f1543317173496-Clarks-Men-Tan-Sneakers-7531543317172788-1.jpg";

const AttributeComponent = () => (
  <>
    <h1>Choose a Size</h1>
    <p>
      SomeSome contnetSome contnetSome contnetSome contnetSome contnetSome
      contnet contnet
    </p>
  </>
);

const ProductCard = () => {
  const [isOpen, updateOpenState] = React.useState(false);
  return (
    <div className="main-card-container">
      <div className="image-container">
        <a>
          <img className="product-image" alt="" src={link} />
        </a>
        <div className="remove-icon">
          <Icon type="close" />
        </div>
        <div className={`card-shim ${isOpen && "card-shim-active"}`} />
      </div>
      <div
        className={`attribute-display-div ${isOpen &&
          "show-attribute-display-div"}`}
      >
        <AttributeComponent />
      </div>
      <div className="actions-container">
        <div className="item-details">
          <div className="item-title">Clarks Men Tan Brown Sneakers</div>
          <div className="price-label-container">
            <span className="item-details-strike">Rs.7,999</span>
            <span className="item-details-bold">Rs.5,599</span>
            <span className="item-details-discountPercent">(30% OFF)</span>
          </div>
        </div>
        <div
          className="item-action-div"
          onClick={() => updateOpenState(!isOpen)}
        >
          <a style={{ display: "block" }}>
            {!isOpen ? "MOVE TO CART" : "DONE"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

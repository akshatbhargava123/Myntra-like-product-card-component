import React from "react";
import { Icon } from "antd";
import { Carousel, Button } from "antd";
import SelectOptions from "./SelectOptions";
import "./ProductCard.css";

const AttributeComponent = ({ attribute, onClose }) => (
  <>
    <div className="attribute-selector-header">
      <div className="attribute-selector heading">Select {attribute.name}</div>
      <div className="attribute-selector-close" onClick={onClose}>
        <Icon type="close" />
      </div>
    </div>
    <div
      style={{
        overflowY: "scroll",
        height: 130,
        marginLeft: "36%",
        paddingTop: 14
      }}
    >
      <SelectOptions
        options={attribute.values.map(v => v.name)}
        onSelect={i => onClose(i)}
      />
    </div>
  </>
);

const slickCarouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  dots: false
};

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      attributeValues: [],
      attributesSelected: 0
    };
    this.Carousel = null;
  }

  startMoving = () => {
    this.interval = setInterval(() => {
      if (this.Carousel) this.Carousel.next();
    }, 1300);
  };

  stopMoving = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  onAttributeSelect = selected => {
    if (
      selected === undefined ||
      selected == null ||
      typeof selected != "number"
    )
      return this.setState({ isOpen: !this.state.isOpen });
    if (this.state.attributesSelected >= this.props.product.attributes.length) {
      if (this.props.onAddToCartClick)
        this.props.onAddToCartClick(this.state.attributeValues);
      return this.setState({
        attributeValues: [],
        attributesSelected: 0
      });
    }
    this.setState(
      {
        attributeValues: [...this.state.attributeValues, selected],
        attributesSelected: this.state.attributesSelected + 1 || 0
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { product } = this.props;
    const { isOpen, attributeValues } = this.state;

    const {
      name,
      pictures,
      attributes,
      actualPrice,
      discountedPrice,
      salePercent
    } = product;

    console.log(product);

    return (
      <div
        className="main-card-container"
        onMouseOver={this.startMoving}
        onMouseOut={this.stopMoving}
      >
        <div className="image-container">
          <a>
            <Carousel
              ref={ref => {
                this.Carousel = ref;
              }}
              {...slickCarouselSettings}
            >
              {pictures.map((picture, i) => {
                return (
                  <div>
                    <img
                      key={i}
                      className="product-image"
                      alt=""
                      src={picture}
                    />
                  </div>
                );
              })}
            </Carousel>
          </a>
          {this.props.showClose && (
            <div className="remove-icon" onClick={this.props.onCloseClick}>
              <Icon type="close" />
            </div>
          )}
          <div className={`card-shim ${isOpen && "card-shim-active"}`} />
        </div>
        <div
          className={`attribute-display-div ${isOpen &&
            "show-attribute-display-div"}`}
        >
          {attributes[attributeValues.length] ? (
            <AttributeComponent
              attribute={attributes[attributeValues.length]}
              onClose={this.onAttributeSelect}
            />
          ) : (
            ""
          )}
        </div>
        <div className="actions-container">
          <div className="item-details">
            <div className="item-title">{name}</div>
            <div className="price-label-container">
              <span className="item-details-bold">₹ {discountedPrice}</span>
              <span className="item-details-strike">₹ {actualPrice}</span>
              <span className="item-details-discountPercent">
                ({salePercent}% OFF)
              </span>
            </div>
          </div>
          <div
            className="item-action-div"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            <Button style={{ marginRight: 8 }} type="primary">
              ADD TO CART
            </Button>
            <Button>WISHLIST</Button>
            {/* <a style={{ display: "block" }}>{!isOpen ? "WISHLIST" : "DONE"}</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;

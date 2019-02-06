import React from "react";
import { Icon } from "antd";
import { Carousel, Button } from "antd";
import SelectOptions from "./SelectOptions";
import "./ProductCard.css";

const AttributeComponent = ({ attribute, onClose }) => (
  <>
    <div className="attribute-selector-header">
      <div className="attribute-selector-heading">Select {attribute.name}</div>
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
        focusOnHover={true}
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

    this.startMoving = this.startMoving.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
  }

  startMoving() {
    if (!this.interval)
      this.interval = setInterval(() => {
        if (this.Carousel) this.Carousel.next();
      }, 1300);
  }

  stopMoving() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onAttributeSelect = selected => {
    const { attributesSelected, attributeValues } = this.state;
    const { product, onAddToCartClick } = this.props;
    if (
      selected === undefined ||
      selected == null ||
      typeof selected != "number"
    )
      return this.setState({
        attributeValues: [],
        attributesSelected: 0,
        isOpen: false
      });
    this.setState({
      isOpen: false,
      attributesSelected: attributesSelected + 1
    });
    if (attributesSelected >= product.attributes.length - 1) {
      if (onAddToCartClick) onAddToCartClick([...attributeValues, selected]);
      return this.setState({
        attributeValues: [],
        attributesSelected: 0
      });
    }
    setTimeout(() => {
      this.setState({
        attributeValues: [...attributeValues, selected],
        isOpen: true
      });
    }, 300);
  };

  render() {
    const { product, onProductClick } = this.props;
    const { isOpen, attributeValues, attributesSelected } = this.state;

    const {
      name,
      pictures,
      attributes,
      actualPrice,
      discountedPrice,
      salePercent
    } = product;

    return (
      <div
        onMouseOver={this.startMoving}
        onMouseOut={this.stopMoving}
        style={{ width: 250, height: 424 }}
      >
        <div
          className="main-card-container"
          style={{ height: this.props.height }}
        >
          <div className="image-container">
            <a onClick={onProductClick ? onProductClick() : () => {}}>
              <Carousel
                ref={ref => {
                  this.Carousel = ref;
                }}
                {...slickCarouselSettings}
              >
                {pictures.map((picture, i) => {
                  return (
                    <div key={i}>
                      <img className="product-image" alt="" src={picture} />
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
            {isOpen && attributes[attributeValues.length] ? (
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
            <div className="item-action-div">
              <Button
                type="primary"
                className="add-to-cart-btn"
                loading={isOpen}
                onClick={() => this.setState({ isOpen: !isOpen })}
              >
                {"ADD TO CART"}
              </Button>
              {!isOpen && attributesSelected == 0 && <Button>WISHLIST</Button>}
              {/* <a style={{ display: "block" }}>{!isOpen ? "WISHLIST" : "DONE"}</a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;

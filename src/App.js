import React, { Component } from "react";
import "antd/dist/antd.css";
import ProductCard from "./ProductCard";
import AttributeModalSelect from "./AttributeModalSelect";
import { Carousel } from "antd";

const hardCodedProduct = {
  name: "Men Navy Blue Solid Hooded Sweatshirt",
  discountedPrice: 999,
  actualPrice: 1999,
  salePercent: 50,
  pictures: [
    "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/6997811/2018/11/15/a835f8e2-de81-4e9e-bc35-0a9d064737fd1542271007646-Indian-Terrain-Men-Navy-Blue-Solid-Hooded-Sweatshirt-9251542271007269-1.jpg",
    "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/6997811/2018/11/15/377fc261-f719-4667-8856-9b3b527ca87c1542271007598-Indian-Terrain-Men-Navy-Blue-Solid-Hooded-Sweatshirt-9251542271007269-3.jpg",
    "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/6997811/2018/11/15/a0bb6b2d-1e35-44b6-85fa-547bbfa794d31542271007579-Indian-Terrain-Men-Navy-Blue-Solid-Hooded-Sweatshirt-9251542271007269-4.jpg",
    "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/6997811/2018/11/15/b7f5b85b-fb7d-45fc-a8e9-03b31a9bc2e41542271007568-Indian-Terrain-Men-Navy-Blue-Solid-Hooded-Sweatshirt-9251542271007269-5.jpg"
  ],
  attributes: [
    {
      name: "Size",
      values: [{ name: "Small" }, { name: "Medium" }, { name: "Large" }]
    },
    {
      name: "Quantity",
      values: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" }
      ]
    }
  ]
};

class App extends Component {
  render() {
    const products = Array(12).fill(hardCodedProduct);

    return (
      <div style={{ background: "red", padding: "30px" }}>
        {/* <ProductCard />
        <ProductCard />
        <ProductCard /> */}
        <Carousel
          {...{
            dots: true,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 4
          }}
        >
          {products.map(product => (
            <div>
              <ProductCard
                showCloseIcon
                onCloseClick={() => console.log("closed!")}
                product={product}
                onAddToCartClick={something =>
                  console.log("something", something)
                }
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default App;

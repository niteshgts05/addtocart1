import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {data} from "./data";
const Category = ({categoryData}) => {
    // const categoryData = data;
  var settings = {
    // autoplay:true,
    // autoplaySpeed:100,
    nextArrow:<p></p>,
    prevArrow:<p></p>,
    arrows:true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0.5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div style={{ background: "#eee" }}>
      <div className="container" id="header-category-bk">
        <Slider {...settings}>
          {categoryData.length > 0 &&
            categoryData.map((value, key) => (
              <div className="item" key={key}>
                <div className="category-item">
                  <Link
                    to={{
                      pathname: `/shop/grocery-staples`,
                    //   state:{id: value.category_id}
                    }}
                  >
                    <img
                      className="img-fluid"
                      src={value.category_image}
                      alt={value.category_name}
                    />
                    <h6>{value.category_name}</h6>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
  // }
};
export default Category;

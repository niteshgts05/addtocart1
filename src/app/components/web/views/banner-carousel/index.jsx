import React, { Component, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from '../category';
import { connect } from 'react-redux';

const Bannerslider = ({categoryData}) =>{
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    
        const categoryImg = {
            src:[
                "img/category/grocerystample.jpg",
                "img/category/personalcare.png",
                "img/category/household.png",
                "img/category/kitchen.png",
                "img/category/beverage.png",
                "img/category/grocerystample.jpg",
                "img/category/personalcare.png",
                "img/category/household.png",
                "img/category/kitchen.png",
                "img/category/beverage.png"
            ]
        }
        

        return (
            <div>
                <Category categoryImg = {categoryImg} categoryData={categoryData} />
                {/* <Slider {...settings}>
                    <div className="owl-item">
                        <img src="img/banners/offer-1.jpg" alt="supermarket" />
                    </div >
                    <div className="owl-item">
                        <img src="img/banners/offer-2.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img src="img/banners/offer-3.jpg" alt="supermarket" />
                    </div>
                </Slider> */}
            </div>
        )
}

// export default Bannerslider;

export default connect(null)(Bannerslider);

import React, { Component, useEffect, useState } from "react";
import Bannerslider from "../banner-carousel";
import Topsavers from "./top-section";
import Bestofferbanner from "./best-offers-banner";
import Topstample from "./top-stample";
import { GetCategoryDetails } from "../../../services";

const Home = () => {
  const [categoryData, setCategoryData] = useState({});
  useEffect(() => {
    async function homadata() {
      const res = await GetCategoryDetails.getAllCategoryList();
      if (res) {
        await setCategoryData(res.data);
      } else {
        console.log("error");
      }
    }
    homadata();
  }, []);
  return (
    <div className="wrapper">
      <Bannerslider categoryData={categoryData} />
      {/* <Topsavers /> */}
      {/* <Bestofferbanner /> */}
      <Topstample />
    </div>
  );
};

export default Home;

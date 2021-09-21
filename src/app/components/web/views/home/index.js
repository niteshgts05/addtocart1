import React, { Component, useEffect, useState } from "react";
import Bannerslider from "../banner-carousel";
import Topsavers from "./top-section";
import Bestofferbanner from "./best-offers-banner";
import Topstample from "./top-stample";
import { GetCategoryDetails } from "../../../services";

const Home = () => {
  return (
    <div className="wrapper">
      <Topsavers />
    </div>
  );
};

export default Home;

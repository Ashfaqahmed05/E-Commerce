import { Context, useContext } from "react";

import HeroSection from "../../components/heroSection/heroSection";
import Category from "../../components/category/Category";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import myContext from "../../context/myContext";

const HomePage = () => {
    const context = useContext(myContext);
    // const name = context
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <ProductCard/>
            <Track/>
            <Testimonial/>
            {/* {name} */}
        </Layout>
    );
}

export default HomePage;
import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";

import "pure-react-carousel/dist/react-carousel.es.css";
import { useState } from "react";
import { fetchFeaturedProductListAPI } from "../../store/actions/product";
import Loader from "react-loader-spinner";
import AboutUs from "../../components/Home/AboutUs";
import HomeBanner from "../../components/Home/HomeBanner";
import ProductBox from "../../components/Home/ProductBox";
import { connect } from "react-redux";

const HomeScreen = ({ selectedCity }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    if (isActive) {
      fetchProducts(0);
    }

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (selectedCity !== "") {
      fetchProducts(0, true);
    }
  }, [selectedCity]);

  const fetchProducts = (value, isCity = false) => {
    fetchFeaturedProductListAPI(value, selectedCity).then((res) => {
      setLoading(false);
      if (isCity) {
        setProducts(res.data);
      } else {
        setProducts([...products, ...res.data]);
      }
      setHasMore(res.has_more);
    });
  };

  useEffect(() => {
    if (offset !== 0) {
      fetchProducts(offset);
    }
  }, [offset]);

  const loadProduct = () => {
    setOffset(offset + 1);
  };

  return (
    <div>
      <HomeBanner />

      <div className="container-fluid" style={{ marginTop: "40px" }}>
        <div className="row featuredContainer">
          <div className="col-lg-12 col-md-12">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Featured Products</h2>
                {/*<p onClick={() => this.check} style={{cursor: 'pointer'}}>view more <i*/}
                {/*    className="fa fa-angle-right"></i></p>*/}
              </div>
              {loading ? (
                <Loader
                  style={{ marginTop: "100px", textAlign: "center" }}
                  type="Rings"
                  color="red"
                  height={100}
                  width={100}
                />
              ) : (
                ""
              )}
            </div>
            <ProductBox products={products} />
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              {!hasMore ? (
                "No more products"
              ) : (
                <Button onClick={() => loadProduct()} color="red">
                  View more
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCity: state.selectedCity.data,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);

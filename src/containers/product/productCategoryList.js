import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";

import "pure-react-carousel/dist/react-carousel.es.css";
import { useState } from "react";
import { fetchProductListAPI } from "../../store/actions/product";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ProductBox from "../../components/Home/ProductBox";

export default function ProductCategoryList() {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(7);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    if (isActive) {
      fetchProducts(7, 0, params.category);
    }

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    fetchProducts(7, 0, params.category, true);
  }, [params.category]);

  const fetchProducts = (limit, offset, category, is_params = false) => {
    fetchProductListAPI(limit, offset, category).then((res) => {
      setLoading(false);
      if (is_params) {
        setProducts(res.data);
      } else {
        setProducts([...products, ...res.data]);
      }
      setHasMore(res.has_more);
    });
  };

  useEffect(() => {
    if (offset !== 0) {
      fetchProducts(limit, offset, params.category);
    }
  }, [offset]);

  const loadProduct = () => {
    setOffset(offset + 7);
  };

  return (
    <div className="container-fluid" style={{ marginTop: "40px" }}>
      <div className="row featuredContainer">
        <div className="col-lg-12 col-md-12">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>{params.category}</h2>
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
          <ProductBox products={products} isCategory={true} />
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
  );
}

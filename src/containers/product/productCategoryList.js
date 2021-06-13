import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";

import "pure-react-carousel/dist/react-carousel.es.css";
import { useState } from "react";
import { fetchProductListAPI } from "../../store/actions/product";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ProductBox from "../../components/Home/ProductBox";
import MultiTypeFilter from "../../components/Product/MultiTypeFilter";
import PriceRangeFilter from "../../components/Product/PriceRangeFilter";
import { connect } from "react-redux";

const ProductCategoryList = ({ selectedCity }) => {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(7);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchProducts(7, 0, params.category, true);
  }, [params.category, selectedCity]);

  const fetchProducts = (
    limit,
    offset,
    category,
    is_params = false,
    filterData
  ) => {
    let data = {};
    data["limit"] = limit;
    data["offset"] = offset;
    data["category"] = category;
    if (filterData && filterData.price !== undefined) {
      data["price_begin"] = filterData.price[0];
      data["price_end"] = filterData.price[1];
    }
    if (filterData && filterData.distance !== undefined) {
      data["km_begin"] = filterData.distance[0];
      data["km_end"] = filterData.distance[1];
    }
    if (filterData && filterData.year !== undefined) {
      data["year_begin"] = filterData.year[0];
      data["year_end"] = filterData.year[1];
    }
    if (filterData && filterData.brand !== undefined) {
      data["brand"] = filterData.brand;
    }

    if (
      selectedCity !== null ||
      selectedCity !== undefined ||
      selectedCity !== ""
    ) {
      data["city"] = selectedCity;
    }
    fetchProductListAPI(data).then((res) => {
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

  const handleMultiFilter = (data) => {
    if (
      data.price !== undefined ||
      data.distance !== undefined ||
      data.brand !== undefined ||
      data.year !== undefined
    ) {
      fetchProducts(limit, 0, params.category, true, data);
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: "40px" }}>
      <div className="row featuredContainer">
        <div className="col-lg-3 col-md-12">
          {params.category == "car" ||
          params.category == "bike" ||
          params.category == "scooter" ||
          params.category == "modified" ||
          params.category == "motorcycle" ||
          params.category == "mobile" ? (
            <MultiTypeFilter onChange={handleMultiFilter} />
          ) : (
            <PriceRangeFilter onChange={handleMultiFilter} />
          )}
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="section-heading">
            <h2>
              {params.category.charAt(0).toUpperCase() +
                params.category.slice(1)}{" "}
              {selectedCity ? `in ${selectedCity}` : null}
            </h2>
          </div>

          <ProductBox products={products} isCategory={true} />
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
};

const mapStateToProps = (state) => {
  return {
    selectedCity: state.selectedCity.data,
  };
};

export default connect(mapStateToProps, null)(ProductCategoryList);

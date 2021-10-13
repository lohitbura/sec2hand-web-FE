import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import ProductBox from "../../../components/Home/ProductBox";
import { searchProductListAPI } from "../../../store/actions/product";

export default function SearchProductComponent() {
  const params = useParams();

  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    searchProductListAPI(params.query).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [params.query]);
  return (
    <div className="container-fluid" style={{ marginTop: "40px", height: '100vh' }}>
      <div className="row featuredContainer">
        <div className="col-lg-12 col-md-12">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Search for {`"${params.query}"`}</h2>
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
          <ProductBox products={data} />
        </div>
      </div>
    </div>
  );
}

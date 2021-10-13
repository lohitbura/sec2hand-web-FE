import React, { useState } from "react";
import * as ImIcons from "react-icons/im";
import { fetchCity } from "../../store/actions/cityList";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCity } from "../../store/actions/city";
import { searchProduct } from "../../store/actions/search";
import {useHistory} from 'react-router-dom'

function Search({ searchProduct }) {
  const [query, setQuery] = useState("");

  const history = useHistory()

  return (
    <div className="col-sm-4 text-center searchM">
      <div className="d-flex searchBar searchHide">
        <input
          type="search"
          placeholder="Find Cars, Mobile, Bikes and more...... "
          onChange={(e) => setQuery(e.target.value)}
          name="productType"
          style={{ height: 30 }}
        />
        <button
          className="btn"
          type="submit"
          onClick={() => history.push(`/product-search/${query}`)}
        >
          <ImIcons.ImSearch color="white" className="icons" />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    query: state.query.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (value) => dispatch(searchProduct(value)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

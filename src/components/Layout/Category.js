import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORY_TYPE } from "../../services/data";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Search from "./Search";
import CityFilter from "./CityFilter";
import "./styles/category.css";
import useOnClickOutsideRef from "../../helpers/handler";

export default function Category() {
  const history = useHistory();
  const [categoryActive, setCategoryActive] = useState("");
  const modalRef = useOnClickOutsideRef(categoryActive, () =>
    setCategoryActive("")
  );
  const handleClick = (item) => {
    if (!item.parent) {
      history.replace(`/product-list/${item.value}`);
      setCategoryActive("");
    } else {
      if (categoryActive.value == item.value) {
        setCategoryActive("");
      } else {
        setCategoryActive(item);
      }
    }
  };

  const handleSubCategory = (item) => {
    history.replace(`/product-list/${item.value}`);
  };

  return (
    <div style={{ paddingTop: 60 }}>
      <div
        className="categoryTopHide"
        style={{ padding: 8, backgroundColor: "#5B1C03" }}
      >
        <div>
          <div style={{ marginBottom: 20 }}>
            <Search />
          </div>
          <CityFilter />
        </div>
      </div>
      <div className="">
        <div
          className="category_main_div"
          style={{ padding: 8, backgroundColor: "#5B1C03" }}
        >
          {CATEGORY_TYPE.map((item) => (
            <div
              className="col-sm category_title_div"
              onClick={() => handleClick(item)}
              style={
                !item.title1
                  ? {
                      fontSize: 17,
                      fontWeight: "bold",
                      color: "#fff",
                      cursor: "pointer",
                    }
                  : {
                      fontSize: 22,
                      marginRight: 24,
                      fontWeight: "bold",
                      color: "#fff",
                    }
              }
            >
              {console.log(item)}
              {item.title}
              {item && item.category ? (
                item.parent && categoryActive.title == item.title ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )
              ) : null}
              <div
                ref={modalRef}
                className={`sub_category_main_div ${
                  categoryActive.title != item.title
                    ? " sub_category_main_div_deactive"
                    : "sub_category_main_div_active "
                } `}
              >
                {categoryActive.parent && categoryActive.title == item.title ? (
                  <div className="">
                    {categoryActive.category.map((item) => {
                      return (
                        <div className="col-sm">
                          <div
                            onClick={() => handleSubCategory(item)}
                            style={
                              !item.title1
                                ? {
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    color: "#fff",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                  }
                                : {
                                    fontSize: 22,
                                    marginRight: 24,
                                    fontWeight: "bold",
                                    color: "#fff",
                                  }
                            }
                          >
                            {item.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  box: {
    padding: 10,
    border: "1px solid black",
    marginRight: 30,
    fontWeight: "bold",
    minWidth: 100,
    minHeight: 44,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 10,
  },
  active: {
    padding: 10,
    border: "1px solid black",
    marginRight: 10,
    fontWeight: "bold",
    minWidth: 85,
    textAlign: "center",
    cursor: "pointer",
    color: "white",
    borderRadius: 10,
    background: "#911076",
  },
};

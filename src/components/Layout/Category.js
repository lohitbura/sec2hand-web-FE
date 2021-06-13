import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORY_TYPE } from "../../services/data";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export default function Category() {
  const history = useHistory();
  const [categoryActive, setCategoryActive] = useState("");
  const [parentActive, setParentActive] = useState("");

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
    <>
      <div style={{ paddingTop: 100 }}></div>
      <div style={{ margin: "0 50px" }}>
        <div style={{ display: "flex", alignItems: "start" }}>
          {CATEGORY_TYPE.map((item) => {
            return (
              <div onClick={() => handleClick(item)} style={styles.box}>
                {item.title}{" "}
                {item.value == categoryActive.value && categoryActive.parent ? (
                  <ArrowDropUpIcon />
                ) : item.parent ? (
                  <ArrowDropDownIcon />
                ) : null}
              </div>
            );
          })}
        </div>
        {categoryActive.parent ? (
          <div style={{ display: "flex", alignItems: "start", marginTop: 10 }}>
            {categoryActive.category.map((item) => {
              return (
                <div onClick={() => handleSubCategory(item)} style={styles.box}>
                  {item.title}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

const styles = {
  box: {
    padding: 10,
    border: "1px solid black",
    marginRight: 10,
    fontWeight: "bold",
    minWidth: 85,
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

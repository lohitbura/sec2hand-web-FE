import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORY_TYPE } from "../../services/data";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export default function Category() {
  const history = useHistory();
  const [categoryActive, setCategoryActive] = useState("");

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

  const data =[
    {name:'CATEGORIES',title:true},
    {name:'CARS'},
    {name:'BIKES',value:'bike'},
    {name:'MOBILES',value:'bike'},
    {name:'ELECTRONICS',value:'bike'},
    {name:'FURNITURE',value:'bike'},
    {name:'PROPERTY',value:'bike'},
    {name:'BOOKS',value:'bike'},
    {name:'SPORTS',value:'bike'}
  ]

  return (
    <>
      <div style={{ paddingTop: 70 }}>
      <div className="row" style={{padding:8,backgroundColor:'#5B1C03'}}>
          {CATEGORY_TYPE.map((item) => (
             <div className="col-sm"
             onClick={() => handleClick(item)}
              style={!item.title1?{fontSize:17,fontWeight:'bold',color:'#fff'}:{fontSize:22,marginRight:24,fontWeight:'bold',color:'#fff'}}>
             {item.title} 
             {item && item.category ? (
                     <ArrowDropDownIcon />
                  ) : item.parent && !item.title1 ? (
                    <ArrowDropUpIcon />
                  ) : null}
           </div>
          )
            
          )}
          

      </div>
         
      </div>


     {/*  <div style={{ margin: "0 50px" }}>
        <div className="row">
          {CATEGORY_TYPE.map((item) => {
            return (
              <div className="col-sm">
                <div onClick={() => handleClick(item)} style={styles.box}>
                  {item.title}{" "}
                  {item.value == categoryActive.value &&
                  categoryActive.parent ? (
                    <ArrowDropUpIcon />
                  ) : item.parent ? (
                    <ArrowDropDownIcon />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 10 }}>
          {categoryActive.parent ? (
            <div className="row">
              {categoryActive.category.map((item) => {
                return (
                  <div className="col-sm">
                    <div
                      onClick={() => handleSubCategory(item)}
                      style={styles.box}
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
   */}  </>
  );
}

const styles = {
  box: {
    padding: 10,
    border: "1px solid black",
    marginRight: 10,
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

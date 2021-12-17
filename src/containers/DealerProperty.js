import React, { useState } from "react";
import "../components/Dealer/styles/dealerStyle.css";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import DealerProfile from "../components/Dealer/DealerProfile";
import DealerLeads from "../components/Dealer/DealerLeads";
import DealerSell from "../components/Dealer/DealerSell";
function DealerProperty() {
  const [sidebar, setSidebar] = useState(false);
  const [activeList, setActiveList] = useState(1);
  return (
    <div className="dealer_property_main">
      <div
        className={` ${
          sidebar ? "dealer_left_div_active" : "dealer_left_div"
        }  `}
      >
        <div
          className="dealer_sidebar_icon_div"
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar ? (
            <AiIcons.AiOutlineClose className="dealer_sidebar_icon" />
          ) : (
            <GiIcons.GiHamburgerMenu className="dealer_sidebar_icon" />
          )}
        </div>
        <div className="dealer_sidebar_div">
          <ul>
            <li
              onClick={() => setActiveList(1)}
              className={` ${
                activeList == 1
                  ? "dealer_sidebar_list active_list "
                  : "dealer_sidebar_list"
              } `}
            >
              {" "}
              <FaIcons.FaUserAlt className="dealer_sidebar_list_icon" /> Profile
            </li>
            <li
              onClick={() => setActiveList(2)}
              className={` ${
                activeList == 2
                  ? "dealer_sidebar_list active_list "
                  : "dealer_sidebar_list"
              } `}
            >
              <FaIcons.FaCartPlus className="dealer_sidebar_list_icon" /> Sell
            </li>
            <li
              onClick={() => setActiveList(3)}
              className={` ${
                activeList == 3
                  ? "dealer_sidebar_list active_list "
                  : "dealer_sidebar_list"
              } `}
            >
              <FaIcons.FaDollarSign className="dealer_sidebar_list_icon" />{" "}
              leads
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          sidebar ? "dealer_right_div_active" : "dealer_right_div"
        } `}
      >
        {activeList == 1 && <DealerProfile />}
        {activeList == 2 && <DealerSell />}
        {activeList == 3 && <DealerLeads />}
      </div>
    </div>
  );
}

export default DealerProperty;

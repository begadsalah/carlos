/* Date      : 20-03-2021
/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React from "react";
import ReactDOM from "react-dom";
import ROUTE from "../../config/route";
import domain from "../../config/api/domain";
import { connect, useSelector } from "react-redux";
import isRtl from "../../bootstrap";
const TitleHeader = props => (
    <div className="p-3 border-bottom">
        <div className="d-flex align-items-center">
            <a
                className="font-weight-bold text-danger text-decoration-none"
                onClick={() => window.history.back(-1)}
            >
                <i
                    className={`icofont-rounded-${
                        isRtl ? "right" : "left"
                    } back-page`}
                ></i>
            </a>
            <h6 className="font-weight-bold m-0 ml-3">{props?.title}</h6>
        </div>
    </div>
);
export default TitleHeader;

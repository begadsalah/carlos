import React from "react";
import ReactDOM from "react-dom";
class OfferTab extends React.Component {
    render() {
        return (
            <div className="swiper-container swiper-offers">
                <div className="swiper-wrapper">
                    <div className="swiper-slide w-auto">
                        <div className="card w-250 position-relative overflow-hidden bg-dark text-white border-0">
                            <div className="background opacity-60">
                                <img src="/assets_store/img/food1.jpg" alt="" />
                            </div>
                            <div className="card-body text-center z-1 h-50"></div>
                            <div className="card-footer border-0 z-1">
                                <div className="media">
                                    <div className="media-body">
                                        <h4 className="my-0 font-weight-bold">
                                            20% Off
                                        </h4>
                                        <h6 className="mb-1">MarcDs</h6>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OfferTab;

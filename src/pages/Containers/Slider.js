import React from "react";
import ReactDOM from "react-dom";
import domain from "../../config/api/domain";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
class Slider extends React.Component {
    render() {
        const { sliders, translation } = this.props;
        return sliders && sliders.length ? (
            <div>
                <div className="d-flex align-items-center px-3 ">
                    <h6 className="m-0 capital">
                        {translation?.menu_promo || "Promos for you"}{" "}
                    </h6>
                </div>
                <div>
                    <Carousel
                        showArrows={true}
                        showIndicators={true}
                        autoPlay={true}
                        showThumbs={false}
                        renderIndicator={false}
                        showStatus={false}
                    >
                        {sliders
                            ? sliders.map((data, index) => (
                                  <div
                                      key={index}
                                      className="osahan-slider-item m-2"
                                  >
                                      <a>
                                          <img
                                              src={`${domain.url}/${data.photo_url}`}
                                              className="img-fluid mx-auto rounded shadow-sm"
                                              style={{
                                                  width: "100%",
                                                  height: "100%"
                                              }}
                                              alt="Responsive image"
                                          />
                                      </a>
                                  </div>
                              ))
                            : null}
                    </Carousel>
                </div>
            </div>
        ) : null;

        // <a class="slider-wrapper__img-wrapper"  style={{position:"relative"}}>
        //     <img src={`${domain.url}/${photo}`} alt="" class="slider-wrapper__img slider-cust-img slider-wrapper__img-shadow custom-promo-img" style={{height: "12rem", width: "22rem"}} />
        // </a>
    }
}

export default Slider;

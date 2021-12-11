import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import domain from "../../config/api/domain";
import ROUTE from "../../config/route";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
            store_id: null
        };
    }
    // state = {

    // };
    componentWillMount() {
        this.setState({ store_id: localStorage.getItem("storeId") });
    }
    closeSideBar = value => {
        this.setState({ isSideBarOpen: !value });
        document.body.classList.add("sidemenu-open");
    };
    render() {
        let {
            store_name,
            store_phone,
            address,
            description,
            logo,
            translation,
            is_call_waiter_enable,
            store_theme,
            facebook,
            instagram,
            maps
        } = this.props;
        let { store_id } = this.state;
        let backgroundColor = store_theme.appcolor
            ? store_theme.appcolor
            : "#fff";
        return (
            <div
                style={{ backgroundColor: backgroundColor }}
                className="border-bottom1"
            >
                <div
                    style={{
                        backgroundColor: backgroundColor,
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                    className="d-flex osahan-cart-item-profile  rounded p-3 "
                >
                    <div>
                        <img
                            alt={store_name}
                            src={logo}
                            className="mr-3 head-img"
                        />
                        <div className="d-flex flex-column">
                            <h6 className="mb-1 font-weight-bold">
                                {store_name}
                            </h6>
                            <p className="mb-0 small text-muted">
                                <i className="icofont-google-map text-danger"></i>{" "}
                                {address}
                            </p>
                        </div>
                    </div>

                    <div>
                        {instagram && (
                            <a href={instagram} target="_blank">
                                <i
                                    class="icofont-instagram"
                                    style={{ padding: "10px" }}
                                ></i>
                            </a>
                        )}
                        {facebook && (
                            <a href={facebook} target="_blank">
                                <i
                                    style={{ padding: "10px" }}
                                    class="icofont-facebook"
                                ></i>
                            </a>
                        )}
                        {maps && (
                            <a href={maps} target="_blank">
                                <i
                                    style={{ padding: "10px" }}
                                    class="icofont-location-pin"
                                ></i>
                            </a>
                        )}
                    </div>
                </div>
                <div
                    className="address p-3"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: backgroundColor
                    }}
                >
                    <div
                        className="address p-3"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        <h6 className="m-0 text-dark d-flex align-items-center small">
                            <i className="text-danger icofont-ui-dial-phone"></i>{" "}
                            <a href={`tel:${store_phone}`}>
                                &nbsp;{store_phone}
                            </a>
                        </h6>
                    </div>
                    <div className="address p-3 bg-white">
                        <h6 className="m-0 text-dark d-flex align-items-center small">
                            {!this.props.show ? (
                                <>
                                    {is_call_waiter_enable == 1 ? (
                                        <span className="small ml-auto">
                                            <a
                                                className="font-weight-bold text-decoration-none text-danger"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "#call-the-waiter"
                                                        )
                                                        .click()
                                                }
                                            >
                                                <i className="icofont-boy text-dark"></i>{" "}
                                                {translation?.call_the_waiter ||
                                                    "Call the waiter"}
                                            </a>
                                        </span>
                                    ) : null}
                                </>
                            ) : null}
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}
const mapSateToProps = state => {
    return {
        store_theme: state.store.store_theme,
        facebook: state.store.facebook,
        instagram: state.store.instagram,
        maps: state.store.maps
    };
};

export default connect(mapSateToProps, null)(Header);

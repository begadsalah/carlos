import { Route } from "react-router-dom"

const route = {
    STORE: {
        INDEX: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/store"
                },
                DETAILED: {
                    BODY_TITLE: "",
                    PATH: "/store"
                },
                CART: {
                    BODY_TITLE: "",
                    PATH: "/store/cart"
                }
            }
        },
    },
    ACCOUNT: {
        ORDERS: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/account/orders"
                },
            },
        },
        LOGIN: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/account/login"
                },
            },
        },
        REGISTER: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/account/register"
                },
            },
        },
        FORGOT: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/account/forgot/password"
                },
            },
        },
        PAYMENT: {
            META: {
                TITLE: ""
            },
            PAGES: {
                VIEW: {
                    BODY_TITLE: "",
                    PATH: "/account/payment"
                },
            },
        },
    },


}

export default route;


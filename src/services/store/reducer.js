import { FETCH_STORE_ITEMS, INITIAL_CONFIGURATION } from "./actionTypes";
import domain from "../../config/api/domain";
const initialState = {
    store_id: null,
    table_number: null,
    recommendedItems: [],
    categories: [],
    products: [],
    account_info: [],
    store_name: null,
    description: null,
    service_charge: 0,
    tax: 0,
    sliders: [],
    payment_settings: {},
    store_theme: {
        appcolor: "#fff",
        card: "red"
    },
    cities: []
};
export default function(state = initialState, actions) {
    switch (actions.type) {
        case INITIAL_CONFIGURATION:
            return {
                ...state,
                store_id: actions.payload.store_id,
                table_number: actions.payload.table_number
            };
        case FETCH_STORE_ITEMS:
            return {
                ...state,
                description: actions.payload.data.description,
                store_name: actions.payload.data.store_name,
                store_phone: actions.payload.data.store_phone,
                address: actions.payload.data.address,
                logo: `${domain.url}/${actions.payload.data.logo}`,
                service_charge: actions.payload.data.service_charge,
                tax: actions.payload.data.tax,
                recommendedItems: actions.payload.data.recommended,
                categories: actions.payload.data.categories,
                products: actions.payload.data.products,
                account_info: actions.payload.data.account_info,
                sliders: actions.payload.data.sliders,
                tables: actions.payload.data.tables,
                rooms: actions.payload.data.rooms,
                is_accept_order: actions.payload.data.is_accept_order,
                is_table_enable: actions.payload.data.is_table_enable,
                is_search_enable: actions.payload.data.is_search_enable,
                is_language_enable: actions.payload.data.is_language_enable,
                is_whatsappbutton_enable:
                    actions.payload.data.is_whatsappbutton_enable,

                is_room_delivery_enable:
                    actions.payload.data.is_room_delivery_enable,
                is_room_delivery_dob_enable:
                    actions.payload.data.is_room_delivery_dob_enable,

                is_dining_enable: actions.payload.data.is_dining_enable,
                is_delivery_enable: actions.payload.data.is_delivery_enable,
                is_takeaway_enable: actions.payload.data.is_takeaway_enable,
                is_call_waiter_enable:
                    actions.payload.data.is_call_waiter_enable,

                addons: actions.payload.data.addons,
                payment_settings: actions.payload?.data?.payment_gateways,
                store_theme: initialState.store_theme,
                cities: actions.payload.data.cities,
                facebook: actions.payload.data.facebook,
                instagram: actions.payload.data.instagram,
                maps: actions.payload.data.maps
            };
        default:
            return state;
    }
}

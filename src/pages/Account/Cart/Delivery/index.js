import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Delivery(props) {
    const language = useSelector(state => state.translation?.active?.data);
    const tr = language.language_name ? language.language_name : "en";

    const cities = useSelector(state => state.store.cities);
    const translation = props.translation;
    const [area, setarea] = useState([]);

    const _setcity = e => {
        const picked = cities[e.target.value];
        props.setDeliveryCost(picked.cost);
        props.onChangecity(picked.name[tr]);
        setarea(picked.areas);
    };
    const _selectedarea = e => props.onChangearea(e.target.value);

    const rtlSttle = { display: "flex", alignItems: "flex-start" };

    return (
        <div>
            <div className="form-group">
                <label style={rtlSttle} htmlFor="exampleInputNEWPassword1">
                    {translation?.select_city || "city"} *
                </label>
                <select
                    style={props.hasErrors("city")}
                    type="text"
                    className="form-control"
                    name="order_type"
                    placeholder="Enter Your Table No"
                    onChange={_setcity}
                    defaultValue={cities ? cities[0] : ""}
                >
                    <option>{translation?.select_city || "city"}</option>
                    {cities &&
                        cities.map((e, i) => (
                            <option key={`${i}`} value={i}>
                                {e.name[tr]}
                            </option>
                        ))}
                </select>
                {area && area.length > 0 && (
                    <>
                        <label
                            style={rtlSttle}
                            htmlFor="exampleInputNEWPassword1"
                        >
                            {translation?.select_area || "area"} *
                        </label>
                        <select
                            style={props.hasErrors("area")}
                            type="text"
                            className="form-control"
                            name="order_type"
                            placeholder="Enter Your Table No"
                            onChange={_selectedarea}
                            defaultValue={"select Area"}
                        >
                            <option>
                                {translation?.select_area || "area"}{" "}
                            </option>
                            {area &&
                                area.map((e, i) => (
                                    <option key={`${i}`} value={e.name[tr]}>
                                        {e.name[tr]}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
            </div>

            <label style={rtlSttle} htmlFor="exampleInputNEWPassword1">
                {translation?.address || "Address"} *
            </label>
            <input
                style={props.hasErrors("address")}
                type="text"
                placeholder={translation?.address || "Address"}
                className="form-control"
                name="address"
                value={props.address}
                onChange={props.onChange}
            />
        </div>
    );
}

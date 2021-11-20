import React from "react";
import { useSelector } from "react-redux";

export const Room = props => {
    const { style, translation, onChange, hasErrors, room_number } = props;
    const rooms = useSelector(state => state.store.rooms);
    return (
        <>
            <div className="form-group">
                <label
                    className="rtl-label"
                    style={style}
                    htmlFor="exampleInputNEWPassword1"
                >
                    {translation?.select_your_room || "Select Your Room"}
                </label>
                <select
                    type="text"
                    className="form-control"
                    name="room_number"
                    placeholder="Enter Your Room No"
                    value={room_number}
                    style={{ ...style, ...hasErrors("room_number") }}
                    onChange={onChange}
                >
                    <option value="">
                        {translation?.select_your_room || "Select Your Room"}
                    </option>
                    {rooms &&
                        rooms.map((data, i) => (
                            <option key={`${i}`}>{data.room_name}</option>
                        ))}
                </select>
            </div>
        </>
    );
};

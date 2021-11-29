import { NavLink } from "react-router-dom";

function GuestNavButtons() {
    return (
        <>
            <NavLink to="/login" > Login </NavLink>
            <NavLink to="/register"  > Register </NavLink>
        </>
    )
}
export default GuestNavButtons;
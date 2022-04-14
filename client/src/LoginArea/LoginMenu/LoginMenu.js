import { NavLink } from "react-router-dom";
import "./LoginMenu.css";

function LoginMenu() {

    return (
        <div className="LoginMenu Box" >
            <NavLink to="/login">
                <button type="button" class="btn btn-primary">Login</button>
            </NavLink>
            <NavLink to="/register">
                <button type="button" class="btn btn-primary">Register</button>
            </NavLink>
            <hr />
        </div>
    );
}

export default LoginMenu;


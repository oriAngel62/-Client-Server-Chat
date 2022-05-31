import { NavLink } from "react-router-dom";
import "./LoginMenu.css";

function LoginMenu() {
    return (
        <div className="LoginMenu Box">
            <NavLink to="/login">
                <a type="button" className="btn primary">
                    Login
                </a>
            </NavLink>
            <NavLink to="/register">
                <a type="button" className="btn primary">
                    Register
                </a>
            </NavLink>
            <a className="btn primary" href="http://localhost:5049/">
                Rank Site
            </a>
            <hr />
        </div>
    );
}

export default LoginMenu;

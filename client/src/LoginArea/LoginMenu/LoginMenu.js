import { NavLink } from "react-router-dom";
import "./LoginMenu.css";

function LoginMenu() {
    return (
        <div className="LoginMenu Box">
            <NavLink to="/login">
                <button type="button" className="btn primary">
                    Login
                </button>
            </NavLink>
            <NavLink to="/register">
                <button type="button" className="btn primary">
                    Register
                </button>
            </NavLink>
            <a className="btn primary" href="http://localhost:5049/">
                Rank Site
            </a>
        </div>
    );
}

export default LoginMenu;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import LoginMenu from "../LoginMenu/LoginMenu";
import { NavLink } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigator = useNavigate();
    const { register, handleSubmit, formState } = useForm();

    async function getUsers() {
        var fullURL = "http://localhost:5285/api/users";
        const res = await fetch(fullURL, {
            method: "GET",
        });
        const data = await res.json();
        if (data) return data;
        else return null;
    }

    async function submit(credentials) {
        var fullURL = "http://localhost:5285/api/users/signin";
        const rawResponse = await fetch(fullURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: credentials.username,
                password: credentials.password,
            }),
        });
        if (rawResponse.status === 404) {
            alert(
                "Username or Password do not match, Please try again or register"
            );
            return;
        }
        const data = await rawResponse.json();
        var token = data.token;
        navigator("/chat", {
            state: { token: token, userId: credentials.username },
        });
    }

    return (
        <div className="Login Box">
            <header>
                <LoginMenu />
            </header>
            <main>
                <h2>Login Form</h2>
                <br />
                <form onSubmit={handleSubmit(submit)}>
                    <label>Username: </label>
                    <input
                        type="text"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please enter user name",
                            },
                        })}
                    />
                    <span>{formState.errors.username?.message}</span>

                    <label>Password: </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please enter password",
                            },
                        })}
                    />
                    <span>{formState.errors.password?.message}</span>

                    <button className="btn btn-success">Login</button>
                </form>
                <p>
                    Not registered yet?{" "}
                    <NavLink to="/register"> Click here</NavLink> to register
                </p>
            </main>
            <footer></footer>
        </div>
    );
}

export default Login;

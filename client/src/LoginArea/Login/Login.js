import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import LoginMenu from "../LoginMenu/LoginMenu"
import "./Login.css";

function Login() {

    const navigator = useNavigate();
    const { register, handleSubmit } = useForm();

    function submit(credentials) {
        for (let x in users) {
            if (users[x].username === credentials.username && users[x].password === credentials.password) {
                // console.log(users[x], true);
                navigator("/chat");
                return;
            }
        }
        alert("Username or Password do not match, Please try again or register");
    }

    const users = [
        { username: "Ori1", password: "12345", displayname: "Ori the cool" },
        { username: "David", password: "12345", displayname: "David the cool" },
        { username: 'Avia', password: '12345', displayname: "Avia the cool" },
        { username: "Yoni", password: "12345", displayname: "Yoni from the block" },
        { username: "Noa", password: "12345", displayname: "Noa 101" },
    ];

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
                    <input type="text" {...register("username")} />

                    <label>Password: </label>
                    <input type="password" {...register("password")} />

                    <button class="btn btn-success">Login</button>

                </form>
            </main>
            <footer>
            </footer>

        </div>
    );
}

export default Login;

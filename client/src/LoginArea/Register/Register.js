import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import LoginMenu from "../LoginMenu/LoginMenu"
import "./Register.css";

function Register() {

    const { register, handleSubmit, formState } = useForm();
    const navigator = useNavigate();

    function submit(credentials) {

        for (let x in users) {
            if (users[x].username === credentials.username) {
                alert("username already exist, please try another username");
                return;
            }
        }
        navigator("/chat");
    }

    const users = [
        { username: "Ori1", password: "12345", displayname: "Ori the cool" },
        { username: "David", password: "12345", displayname: "David the cool" },
        { username: 'Avia', password: '12345', displayname: "Avia the cool" },
        { username: "Yoni", password: "12345", displayname: "Yoni from the block" },
        { username: "Noa", password: "12345", displayname: "Noa 101" },
    ];

    return (
        <div className="Register Box">
            <header>
                <LoginMenu />
            </header>
            <main>
                <h2>Register Form</h2>
                <br />
                <form onSubmit={handleSubmit(submit)}>

                    <label>User name: </label>
                    <input type="text" autoFocus {...register("username", { required: { value: true, message: "Please enter user name" } })} />
                    <span>{formState.errors.username?.message}</span>

                    <label>Password: </label>
                    <input type="password" {...register("password")} required />


                    <label>Display name: </label>
                    <input type="text" {...register("display")} required />

                    <button class="btn btn-success">Register</button>

                </form>
            </main>
            <footer>
            </footer>
        </div>
    );
}

export default Register;

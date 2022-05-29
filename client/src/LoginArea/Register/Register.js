import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import LoginMenu from "../LoginMenu/LoginMenu";
import { NavLink } from "react-router-dom";
import "./Register.css";

function Register() {
    const { register, handleSubmit, formState } = useForm();
    const navigator = useNavigate();

    async function getUsers() {
        var fullURL = 'http://localhost:5285/api/users';
        var result = await fetch(fullURL);
        var data = await result.json();
        return (data);
        // const data = await res.json();
        // return(data);
    }


    async function postUser() {
        //post fuction add contact asp.net
        var username;
        var nickName;
        var password;
        if (document.getElementById('userName').value)
            username = document.getElementById('userName').value;
        if (document.getElementById('nickName').value )
            nickName = document.getElementById('nickName').value;
        if (document.getElementById('password').value )
            password = document.getElementById('password').value;

        if (username  && nickName  && password ) {

            var currentURL = window.location.hostname;
            const status = await fetch("http://localhost:5285/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: username,
                    nickName: nickName,
                    password: password,
                    server: "localhost:7285",
                }),
            });
        }
    }

    async function submit(credentials) {
        var userList = await getUsers();
        for (let x in userList) {
            if (userList[x].username === credentials.username) {   // maybe: x.username
                alert("username already exist, please try another username");
                return;
            }
        }
        postUser();
        navigator("/login");
    }


    // const users = [
    //     { username: "Ori", password: "a12345", displayname: "Ori" },
    //     { username: "David", password: "a12345", displayname: "David" },
    //     { username: "Avia", password: "a12345", displayname: "Avia" },
    //     { username: "Yoni", password: "a12345", displayname: "Yoni" },
    //     { username: "Noa", password: "a12345", displayname: "Noa" },
    //     { username: "Shaked", password: "a12345", displayname: "Shaked" },
    //     { username: "Aviv", password: "a12345", displayname: "Aviv" },
    // ];

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
                    <input
                        id='userName' type="text"
                        autoFocus
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please enter user name",
                            },
                            minLength: {
                                value: 3,
                                message: "Please enter Min 3 charachters",
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{3,}$/,
                                message: "Must have letters or numbers only",
                            },
                        })}
                    />
                    <span>{formState.errors.username?.message}</span>

                    <label>Password: </label>
                    <input
                        id='password' type="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please enter password",
                            },
                            minLength: {
                                value: 3,
                                message: "Please enter Min 3 charachters",
                            },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                                message:
                                    "Must have minimum one letter and minimum one number",
                            },
                        })}
                    />
                    <span>{formState.errors.password?.message}</span>

                    <label>Display name: </label>
                    <input type="text" id='nickName' {...register("display")} required />

                    <button className="btn btn-success" >Register</button>
                </form>
                <p>
                    Already registered{" "}
                    <NavLink to="/login"> Click here</NavLink> to login
                </p>
            </main>
            <footer></footer>
        </div>
    );
}

export default Register;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import loginSignupImage from "../../assets/LoginSignupImage.jpg";
import NavBar from "../NavBar";
import "./LoginForm.css";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async e => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = e => {
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        setPassword(e.target.value);
    };

    const demoLogin = e => {
        e.preventDefault();
        let email = "demo@aa.io";
        let password = "password";
        dispatch(login(email, password));
    };

    const demoLogin2 = e => {
        e.preventDefault();
        let email = "marnie@aa.io";
        let password = "password";
        dispatch(login(email, password));
    };

    if (user) {
        return <Redirect to="/photostream" />;
    }

    const formatError = error => {
        const startIndex = error.indexOf(":") + 1;
        return error.slice(startIndex);
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginSignupImage})` }}
            id="whole-login-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onLogin} id="login-form">
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{formatError(error)}</div>
                            ))}
                        </div>
                        <div>
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                className="signup-login-fields"
                                name="email"
                                type="text"
                                placeholder="Email address"
                                value={email}
                                onChange={updateEmail}
                            />
                        </div>
                        <div>
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                className="signup-login-fields"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={updatePassword}
                            />
                        </div>
                        <div onClick={onLogin} className="signup-login-button">
                            Login
                        </div>
                        <div
                            id="demo-login"
                            onClick={demoLogin}
                            className="signup-login-button"
                        >
                            Demo User
                        </div>
                        <p id="signup-login-text">
                            Not a MyPhotos member?{" "}
                            <NavLink to="/signup" id="signup-login-link">
                                Sign up here.
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
            {/* <button id="demo-login" onClick={demoLogin2}>
                Demo User2
            </button> */}
        </div>
    );
};

export default LoginForm;

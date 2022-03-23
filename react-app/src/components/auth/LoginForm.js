import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import loginSignupImage from "../../assets/LoginSignupImage.jpg";
import NavBar from "../NavBar";
import { formatError } from "../../helper";
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

    if (user) {
        return <Redirect to="/photostream" />;
    }

    return (
        <div
            style={{ backgroundImage: `url(${loginSignupImage})` }}
            className="whole-signup-login-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onLogin} id="login-form" className="forms">
                        <div className="form-title">Log in to MyPhotos</div>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind} className="errors">
                                    {formatError(error)}
                                </div>
                            ))}
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="signup-login-fields"
                                name="email"
                                type="text"
                                value={email}
                                onChange={updateEmail}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="signup-login-fields"
                                name="password"
                                type="password"
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
                        <p className="signup-login-text">
                            Not a MyPhotos member?{" "}
                            <span className="signup-login-link">
                                <NavLink to="/sign-up">Sign up here.</NavLink>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import NavBar from "../NavBar";
import loginSignupImage from "../../assets/LoginSignupImage.jpg";
import { formatError } from "../../helper";
import "./SignUpForm.css";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async e => {
        e.preventDefault();
        const formData = {
            username,
            email,
            password,
            repeat_password: repeatPassword,
        };
        console.log(formData);
        const data = await dispatch(signUp(formData));
        console.log(data);
        if (data) {
            setErrors(data);
        }
    };

    const updateUsername = e => {
        setUsername(e.target.value);
    };

    const updateEmail = e => {
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = e => {
        setRepeatPassword(e.target.value);
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
                    <form
                        onSubmit={onSignUp}
                        id="signup-form"
                        className="forms"
                    >
                        <div className="form-title">Sign up for MyPhotos</div>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind} className="errors">
                                    {formatError(error)}
                                </div>
                            ))}
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="username">User Name</label>
                            <input
                                id="username"
                                className="signup-login-fields"
                                type="text"
                                name="username"
                                onChange={updateUsername}
                                value={username}
                            ></input>
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="signup-login-fields"
                                type="text"
                                name="email"
                                onChange={updateEmail}
                                value={email}
                            ></input>
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="signup-login-fields"
                                type="password"
                                name="password"
                                onChange={updatePassword}
                                value={password}
                            ></input>
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="repeatPassword">
                                Repeat Password
                            </label>
                            <input
                                id="repeatPassword"
                                className="signup-login-fields"
                                type="password"
                                name="repeat_password"
                                onChange={updateRepeatPassword}
                                value={repeatPassword}
                            ></input>
                        </div>
                        <div onClick={onSignUp} className="signup-login-button">
                            Sign Up
                        </div>
                        <p className="signup-login-text">
                            Already a MyPhotos member?{" "}
                            <span className="signup-login-link">
                                <NavLink to="/login">Log in here.</NavLink>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;

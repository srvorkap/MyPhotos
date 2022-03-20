import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import NavBar from "../NavBar";
import loginSignupImage from "../../assets/LoginSignupImage.jpg";
import "./SignUpForm.css";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //   const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async e => {
        e.preventDefault();
        if (password) {
            //  === repeatPassword) {
            // console.log('-------------------', password, repeatPassword)
            const data = await dispatch(signUp(username, email, password));
            //  ,repeatPassword));
            if (data) {
                setErrors(data);
            }
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

    //   const updateRepeatPassword = (e) => {
    //     setRepeatPassword(e.target.value);
    //   };

    if (user) {
        return <Redirect to="/login" />;
    }

    const formatError = error => {
        const startIndex = error.indexOf(":") + 1;
        return error.slice(startIndex);
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginSignupImage})` }}
            id="whole-signup-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onSignUp} id="signup-form">
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{formatError(error)}</div>
                            ))}
                        </div>
                        <div>
                            {/* <label>User Name</label> */}
                            <input
                                className="signup-login-fields"
                                type="text"
                                name="username"
                                onChange={updateUsername}
                                value={username}
                                placeholder="Username"
                            ></input>
                        </div>
                        <div>
                            {/* <label>Email</label> */}
                            <input
                                className="signup-login-fields"
                                type="text"
                                name="email"
                                onChange={updateEmail}
                                value={email}
                                placeholder="Email address"
                            ></input>
                        </div>
                        <div>
                            {/* <label>Password</label> */}
                            <input
                                className="signup-login-fields"
                                type="password"
                                name="password"
                                onChange={updatePassword}
                                value={password}
                                placeholder="Password"
                            ></input>
                        </div>
                        {/* <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        //   required={true}
        ></input>
      </div> */}
                        <div type="submit" className="signup-login-button">
                            Sign Up
                        </div>
                        <p className="signup-login-text">
                            Already a MyPhotos member?{" "}
                            <span className="signup-login-link">
                            <NavLink to="/login">
                                Log in here.
                            </NavLink></span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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

            <form onSubmit={onSignUp}>
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
                <div type="submit" className="signup-login-button">Sign Up</div>
            </form>
        </div>
    );
};

export default SignUpForm;

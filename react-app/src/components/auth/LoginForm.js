import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

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

    const demoLogin = (e) => {
      e.preventDefault();
      let email = 'demo@aa.io'
      let password = 'password'
      dispatch(login(email, password))
    }

    const demoLogin2 = (e) => {
        e.preventDefault();
        let email = 'marnie@aa.io'
        let password = 'password'
        dispatch(login(email, password))
      }

    if (user) {
        return <Redirect to="/login" />;
    }

    const formatError = error => {
        const startIndex = error.indexOf(':') + 1
        return error.slice(startIndex)
      }

    return (
        <>
            <form onSubmit={onLogin}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{formatError(error)}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                    />
                    <button type="submit">Login</button>
                </div>
            </form>
            <button id="demo-login" onClick={demoLogin}>
                Demo User
            </button>
            <button id="demo-login" onClick={demoLogin2}>
                Demo User2
            </button>
        </>
    );
};

export default LoginForm;

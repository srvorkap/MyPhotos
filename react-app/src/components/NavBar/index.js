import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import './NavBar.css'

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className="margin-right">
                    <a href="https://github.com/srvorkap" target="_blank">
                        <span id="github-icon">
                            <i class="fab fa-github"></i>
                        </span>
                    </a>
                </div>
                <div className="margin-right">
                    <a
                        href="https://www.linkedin.com/in/srdanvorkapic/"
                        target="_blank"
                    >
                        <span id="linkedin-icon">
                            <i class="fab fa-linkedin"></i>
                        </span>
                    </a>
                </div>
                <div>
                    <NavLink
                        to="/photostream"
                        exact={true}
                        activeClassName="active"
                    >
                        Photostream
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/albums" exact={true} activeClassName="active">
                        Albums
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="/explore"
                        exact={true}
                        activeClassName="active"
                    >
                        Explore
                    </NavLink>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className="margin-right">
                    <a href="https://github.com/srvorkap" target="_blank">
                        <span id="github-icon">
                            <i class="fab fa-github"></i>
                        </span>
                    </a>
                </div>
                <div className="margin-right">
                    <a
                        href="https://www.linkedin.com/in/srdanvorkapic/"
                        target="_blank"
                    >
                        <span id="linkedin-icon">
                            <i class="fab fa-linkedin"></i>
                        </span>
                    </a>
                </div>
                <div>
                    <NavLink to="/" exact={true} activeClassName="active">
                        Home
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        Login
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="/sign-up"
                        exact={true}
                        activeClassName="active"
                    >
                        Sign Up
                    </NavLink>
                </div>
            </>
        );
    }
    return (
        <nav>
            <div>
                {sessionLinks}
                {/* <div>
                    <NavLink to="/" exact={true} activeClassName="active">
                        Home
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        Login
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="/sign-up"
                        exact={true}
                        activeClassName="active"
                    >
                        Sign Up
                    </NavLink>
                </div> */}
                {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
            </div>
        </nav>
    );
};

export default NavBar;

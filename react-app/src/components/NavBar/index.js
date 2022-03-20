import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import flickrDots from '../../assets/1.svg'
import "./NavBar.css";

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div id="logo">
                    <img src={flickrDots} id='flickr-dots'/>
                    <h1 id="my-photos">MyPhotos</h1>
                </div>
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
                <div className="margin-right">
                    <NavLink to='/photos/new'>
                        <span>
                        <i class="fas fa-cloud-upload-alt"></i>
                        </span>
                    </NavLink>
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
        <nav id="nav">
            <div>{sessionLinks}</div>
        </nav>
    );
};

export default NavBar;

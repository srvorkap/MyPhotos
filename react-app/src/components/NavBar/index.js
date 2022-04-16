import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import flickrDots from "../../assets/1.svg";

import "./NavBar.css";

const NavBar = () => {
    const sessionUser = useSelector(state => state?.session?.user);

    return (
        <nav id="navbar">
            <div id="navbar-left">
                <NavLink
                    to="/photostream"
                    id="srki"
                    className="nav-items"
                >
                    <img src={flickrDots} id="flickr-dots" alt="flickr dots"/>
                    <h1 id="my-photos">MyPhotos</h1>
                </NavLink>
                {sessionUser && (
                    <>
                        <div className="nav-items">
                            <NavLink
                                to="/photostream"
                                exact={true}
                                activeClassName="active"
                            >
                                Photostream
                            </NavLink>
                        </div>
                        <div className="nav-items">
                            <NavLink
                                to="/albums"
                                exact={true}
                                activeClassName="active"
                            >
                                Albums
                            </NavLink>
                        </div>
                        <div className="nav-items">
                            <NavLink
                                to="/explore"
                                exact={true}
                                activeClassName="active"
                            >
                                Explore
                            </NavLink>
                        </div>
                    </>
                )}
            </div>

            <div id="navbar-center">
                <div className="nav-items">
                    <a href="https://srvorkap.github.io/" target="_blank" rel="noreferrer">
                        <span id="github-icon">
                            <div>Portfolio</div>
                        </span>
                    </a>
                </div>
                <div className="nav-items">
                    <a href="https://github.com/srvorkap" target="_blank" rel="noreferrer">
                        <span id="github-icon">
                            <i className="fab fa-github"></i>
                        </span>
                    </a>
                </div>
                <div className="nav-items">
                    <a
                        href="https://www.linkedin.com/in/srdanvorkapic/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span id="linkedin-icon">
                            <i className="fab fa-linkedin"></i>
                        </span>
                    </a>
                </div>
                <div className="nav-items">
                    <a href="https://angel.co/u/srdan-vorkapic" target="_blank" rel="noreferrer">
                        <span id="linkedin-icon">
                            <i className="fab fa-angellist"></i>
                        </span>
                    </a>
                </div>
            </div>

            {sessionUser && <div></div>}

            <div id="navbar-right">
                {sessionUser ? (
                    <>
                        <div className="nav-items">
                            <NavLink to="/photos/new">
                                <span id="upload-button">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </span>
                            </NavLink>
                        </div>

                        <div className="nav-items">
                            <LogoutButton sessionUser={sessionUser} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav-items">
                            <NavLink
                                to="/login"
                                exact={true}
                                activeClassName="active"
                            >
                                Login
                            </NavLink>
                        </div>
                        <div className="nav-items">
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

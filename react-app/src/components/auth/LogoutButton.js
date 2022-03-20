import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import logoutImage from "../../assets/logout-button.png";
import "./LogoutButton.css";

const LogoutButton = ({ sessionUser }) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (!showMenu) setShowMenu(true);
        else setShowMenu(false);
    };

    const onLogout = async e => {
        await dispatch(logout());
    };

    return (
        <div id="logout">
            <img src={logoutImage} onClick={openMenu} id="logout-image"></img>
            <div>
                {showMenu && (
                    <>
                        <p>Hi {sessionUser.username}!</p>
                        <p onClick={onLogout}>Logout</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogoutButton;

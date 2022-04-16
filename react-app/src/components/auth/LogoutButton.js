import React from "react";
import { useDispatch } from "react-redux";
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
            <img src={logoutImage} onClick={openMenu} id="logout-image" alt="logout"></img>
            {showMenu && (
                <div id="profile-dropdown">
                    <p>{sessionUser.username === 'Demo' ? 'Demo User' : sessionUser.username}</p>
                    <p onClick={onLogout} className="cursor-pointer" id="logout-button">
                        Logout
                    </p>
                </div>
            )}
        </div>
    );
};

export default LogoutButton;

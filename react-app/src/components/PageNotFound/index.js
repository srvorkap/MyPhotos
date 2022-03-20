import { NavLink } from "react-router-dom";
import errorImage from "../../assets/bb.jpg";
import "./PageNotFound.css";

const PageNotFound = ({ sessionUser }) => {
    let link;
    if (sessionUser) link = "/photostream";
    else link = "/login";
    return (
        <div id="page-not-found">
            <h1 id="page-not-found-heading">Page Not Found</h1>
            <div id="page-not-found-bottom">
                <div id="icon-and-text">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Oops! Looks like you followed a bad link.</p>
                </div>
                <p>
                    Here's a link to the{" "}
                    <span className="signup-login-link">
                        <NavLink to={link}>home page</NavLink>.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;

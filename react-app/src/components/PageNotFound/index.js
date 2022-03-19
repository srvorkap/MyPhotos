import { NavLink } from "react-router-dom";
import errorImage from "../../assets/bb.jpg";
import "./PageNotFound.css";

const PageNotFound = ({ sessionUser }) => {
    let link;
    if (sessionUser) link = "/photostream";
    else link = "/login";
    return (
        <>
            <h1>Page Not Found</h1>
            {/* <img src={errorImage} id='error'/> */}
            <div>
                <i class="fas fa-exclamation-triangle"></i>
                <p>Oops! Looks like you followed a bad link.</p>
            </div>
            <p>
                Here's a link to the <NavLink to={link}>home page</NavLink>.
            </p>
        </>
    );
};

export default PageNotFound;

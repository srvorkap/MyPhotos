import landingPageImage from "../../assets/LandingPage.jpeg";
import NavBar from "../NavBar";
import { NavLink, Redirect } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ sessionUser }) => {
    if (sessionUser) return <Redirect to="/photostream" />;
    return (
        <div
            style={{ backgroundImage: `url(${landingPageImage})` }}
            id="whole-landing-page"
        >
            <NavBar />
            <div id="landing-page-content">
                <h1 id="find-your-inspiration">Find your inspiration.</h1>
                <h3 id="join-myphotos">Join MyPhotos and upload images</h3>
                <NavLink to="/sign-up">
                    <div id="start-for-free">Start</div>
                </NavLink>
            </div>
        </div>
    );
};

export default LandingPage;

import landingPageImage from "../../assets/LandingPage.jpeg";
import NavBar from "../NavBar";
import { Redirect } from "react-router-dom";

const LandingPage = ({ sessionUser }) => {
    if (sessionUser) return <Redirect to='/photostream' />
    return (
        <div
            style={{ backgroundImage: `url(${landingPageImage})` }}
            id="whole-login-page"
        >
            <NavBar />
        </div>
    );
};

export default LandingPage;

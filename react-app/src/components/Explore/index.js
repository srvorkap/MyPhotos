import { Redirect, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";
import "./Explore.css";
import defaultImage from "../../assets/404-error.png";
import { useLocation } from "react-router-dom";

const Explore = (props) => {
    const [isActive, setIsActive] = useState(false);

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let otherUsersPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        otherUsersPhotos = allPhotosArr?.filter(
            photo => photo?.user_id !== props?.sessionUser?.id
        );
    }

    otherUsersPhotos?.reverse();

    const dispatch = useDispatch();

    const exploreLocation = useLocation()

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onMouseEnter = e => {
        e.preventDefault();
        setIsActive(true);
    };

    const onMouseLeave = e => {
        e.preventDefault();
        setIsActive(false);
    };

    if (!props?.sessionUser) return <Redirect to="/login" />;
    return (
        <div id="explore-page">
            <div id="inner-explore-page">
                {otherUsersPhotos?.map(photo => (
                    <NavLink to={`/photos/${photo.id}`} key={photo.id} onClick={props.changeLocation(exploreLocation)}>
                        <div id="explore-individual-photo-container">
                            <div id="explore-gradient"></div>
                            <img
                                src={photo.image_url}
                                onError={e => (
                                    (e.target.onerror = null),
                                    (e.target.src = defaultImage)
                                )}
                                className="individual-photo"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            />
                            <div id="explore-text">
                                <p>{photo.title}</p>
                                <p>
                                    {photo?.user_id === props?.sessionUser?.id
                                        ? "by YOU!"
                                        : `by ${photo?.user?.username}`}
                                </p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Explore;

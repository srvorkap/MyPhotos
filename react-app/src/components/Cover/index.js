import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import coverPhoto from "../../assets/cover-photo.jpeg";
import { getPhotos } from "../../store/photo";
import "./Cover.css";
import defaultImage from "../../assets/404-error.png";

const Cover = ({ sessionUser }) => {
    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === sessionUser?.id
        );
    }

    // let numberOfPhotos;
    // if (sessionUserPhotos?.length === 0) numberOfPhotos = null;
    // else if (sessionUserPhotos?.length === 1) numberOfPhotos = "1 Photo";
    // else numberOfPhotos = `${sessionUserPhotos?.length} Photos`;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    return (
        <div id="cover-container">
            <div id="cover-gradient"></div>
            <img
                src={coverPhoto}
                onError={e => (
                    (e.target.onerror = null)
                    (e.target.src = defaultImage)
                )}
                id="cover-image"
                alt="cover"
            ></img>
            <div id='cover-text'>
                <h1>{sessionUser?.username}</h1>
                <h2>
                    {sessionUserPhotos?.length === 0
                        ? `no photos`
                        : sessionUserPhotos?.length === 1
                        ? `1 photo`
                        : `${sessionUserPhotos?.length} photos`}
                </h2>
            </div>
        </div>
    );
};

export default Cover;

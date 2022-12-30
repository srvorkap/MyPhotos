import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPhotos } from "../../store/photo";
import { deletePhoto } from "../../store/photo";
import NavBar from "../NavBar";
import "./PhotoPage.css";
import defaultImage from "../../assets/404-error.png";

const PhotoPage = props => {
    const { photoId } = useParams();
    const photoIdNumerical = +photoId;
    let carouselArr;

    const allPhotosObj = useSelector(store => store?.photo?.photos);

    let sessionUserPhotos;
    let otherUsersPhotos;
    let currentAlbumPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        // Photostream
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === props?.sessionUser?.id
        );
        // Explore
        otherUsersPhotos = allPhotosArr?.filter(
            photo => photo?.user_id !== props?.sessionUser?.id
        );
        // Album
        const albumId = props.location.pathname.split("/")[2];
        const albumIdNumerical = +albumId
        currentAlbumPhotos = allPhotosArr?.filter(
            photo => photo?.album_ids.includes(albumIdNumerical)
        );
    }

    sessionUserPhotos?.reverse();
    otherUsersPhotos?.reverse();
    currentAlbumPhotos?.reverse();

    // Carousel array
    if (props.location.pathname === "/photostream")
        carouselArr = sessionUserPhotos;
    else if (props.location.pathname === "/explore")
        carouselArr = otherUsersPhotos;
    else carouselArr = currentAlbumPhotos;

    let currentPhoto;
    if (allPhotosObj) {
        currentPhoto = carouselArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    const [index, setIndex] = useState(carouselArr.indexOf(currentPhoto));

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onEdit = e => {
        e.preventDefault();
        history.push(`/photos/${carouselArr[index]?.id}/edit`);
    };

    const onDelete = e => {
        e.preventDefault();
        dispatch(deletePhoto(carouselArr[index]?.id));
        history.push(props.location.pathname);
    };

    const onBack = e => {
        e.preventDefault();
        history.push(props.location.pathname);
    };

    const goLeft = () => {
        setIndex(index - 1);
    };

    const goRight = () => {
        setIndex(index + 1);
    };

    if (!props.sessionUser) return <Redirect to="/login" />;
    return (
        <div id="whole-photo-page">
            {/* Navbar */}
            <NavBar />
            {/* Photo */}
            <div id="photo-background">
                <div
                    onClick={onBack}
                    className="cursor-pointer"
                    id="photo-page-go-back"
                >
                    <i className="fas fa-arrow-left"></i>Back
                </div>
                <div id="photo-image-container">
                    <div
                        onClick={index !== 0 && goLeft}
                        id="go-left-container"
                        className={index !== 0 && "cursor-pointer"}
                    >
                        {index !== 0 && (
                            <i
                                className="fas fa-chevron-left"
                                id="chevron-left"
                            ></i>
                        )}
                    </div>
                    <img
                        src={carouselArr[index]?.image_url}
                        onError={e =>
                            (e.target.onerror = null)(
                                (e.target.src = defaultImage)
                            )
                        }
                        id="photo-page-image"
                        alt="individual"
                    />
                    <div
                        onClick={index !== carouselArr.length - 1 && goRight}
                        id="go-right-container"
                        className={
                            index !== carouselArr.length - 1 && "cursor-pointer"
                        }
                    >
                        {index !== carouselArr.length - 1 && (
                            <i
                                className="fas fa-chevron-right"
                                id="chevron-right"
                            ></i>
                        )}
                    </div>
                </div>
                <div>
                    {carouselArr[index]?.user_id === props?.sessionUser?.id && (
                        <>
                            <span className="trash-and-pen-size">
                                <i
                                    className="fas fa-pen cursor-pointer"
                                    id="photo-page-edit-pen"
                                    onClick={onEdit}
                                ></i>
                            </span>
                            <span className="trash-and-pen-size">
                                <i
                                    className="fas fa-trash-alt cursor-pointer"
                                    id="photo-page-trash"
                                    onClick={onDelete}
                                ></i>
                            </span>
                        </>
                    )}
                </div>
            </div>
            {/* Username, Photo title and Photo description */}
            <div id="photo-page-footer">
                <h1>{carouselArr[index]?.user?.username}</h1>
                <h3>{carouselArr[index]?.title}</h3>
                <h5>{carouselArr[index]?.description}</h5>
            </div>
        </div>
    );
};

export default PhotoPage;

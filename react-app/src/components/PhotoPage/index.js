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
    // Photostream
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === props?.sessionUser?.id
        );
    }

    sessionUserPhotos?.reverse();

    // Explore
    // const allPhotosObj = useSelector(store => store?.photo?.photos);
    let otherUsersPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        otherUsersPhotos = allPhotosArr?.filter(
            photo => photo?.user_id !== props?.sessionUser?.id
        );
    }

    otherUsersPhotos?.reverse();

    // Carousel
    if (props.location.pathname === "/photostream")
        carouselArr = sessionUserPhotos;
    else if (props.location.pathname === "/explore")
        carouselArr = otherUsersPhotos;

    // const allPhotosObj = useSelector(store => store?.photo?.photos);
    // let allPhotosArr;
    // if (allPhotosObj) {
    //     allPhotosArr = Object?.values(allPhotosObj);
    // }
    // let [ allPhotosArrNew, setAllPhotosArrNew ] = useState(allPhotosArr ? [...allPhotosArr] : [])
    // let [ allPhotosArr, setAllPhotosArr ] = useState(allPhotosArr?.find(photo => photo?.id === photoIdNumerical))
    let currentPhoto;
    if (allPhotosObj) {
        currentPhoto = carouselArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    let [index, setIndex] = useState(carouselArr.indexOf(currentPhoto));

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
        // dispatch(deletePhoto(currentPhoto.id));
        // if (currentPhoto.album_id)
        //     history.push(`/albums/${currentPhoto.album_id}`);
        // else history.push(`/photostream`);
        history.push(props.location.pathname);
    };

    const onBack = e => {
        e.preventDefault();
        // history.push(`/albums/${currentPhoto.album_id}`);
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
            <NavBar />
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
                        {index !== 0 && <div id="go-left"></div>}
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
                            <div id="go-right"></div>
                        )}
                    </div>
                </div>
                <div>
                    {carouselArr[index]?.user_id === props?.sessionUser?.id && (
                        <>
                            <span className="trash-and-pen-size">
                                <i
                                    className="fas fa-pen"
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
            <div id="photo-page-footer">
                <h1>{carouselArr[index]?.user?.username}</h1>
                <h3>{carouselArr[index]?.title}</h3>
                <h5>{carouselArr[index]?.description}</h5>
            </div>
        </div>
    );
};

export default PhotoPage;

import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPhotos } from "../../store/photo";
import { deletePhoto } from "../../store/photo";
import NavBar from "../NavBar";
import "./PhotoPage.css";
import defaultImage from "../../assets/404-error.png";

const PhotoPage = (props) => {
    const { photoId } = useParams();
    const photoIdNumerical = +photoId;

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentPhoto;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        currentPhoto = allPhotosArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onEdit = e => {
        e.preventDefault();
        history.push(`/photos/${currentPhoto.id}/edit`);
    };

    const onDelete = e => {
        e.preventDefault();
        dispatch(deletePhoto(currentPhoto.id));
        // if (currentPhoto.album_id)
        //     history.push(`/albums/${currentPhoto.album_id}`);
        // else history.push(`/photostream`);
        history.push(props.location.pathname)
    };

    const onBack = e => {
        e.preventDefault();
        // history.push(`/albums/${currentPhoto.album_id}`);
        history.push(props.location.pathname)
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
                    <i class="fas fa-arrow-left"></i>Back
                </div>
                <div id="photo-image-container">
                    <img
                        src={currentPhoto?.image_url}
                        onError={e => (
                            (e.target.onerror = null),
                            (e.target.src = defaultImage)
                        )}
                        id="photo-page-image"
                    />
                </div>
                <div>
                    {currentPhoto?.user_id === props?.sessionUser?.id && (
                        <>
                            <span className="trash-and-pen-size">
                                <i
                                    class="fas fa-pen"
                                    id="photo-page-edit-pen"
                                    onClick={onEdit}
                                ></i>
                            </span>
                            <span className="trash-and-pen-size">
                                <i
                                    class="fas fa-trash-alt cursor-pointer"
                                    id="photo-page-trash"
                                    onClick={onDelete}
                                ></i>
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div id="photo-page-footer">
                <h1>{currentPhoto?.user?.username}</h1>
                <h3>{currentPhoto?.title}</h3>
                <h5>{currentPhoto?.description}</h5>
            </div>
        </div>
    );
};

export default PhotoPage;

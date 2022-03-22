import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { patchPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import { getPhotos } from "../../store/photo";
import { formatError } from "../../helper";
import formBackgroundImage from "../../assets/cover-photo.jpeg";
import "./EditPhotoForm.css";
import NavBar from "../NavBar";

const EditPhotoForm = ({ sessionUser }) => {
    const { photoId } = useParams();
    const photoIdNumerical = +photoId;

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentPhoto;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        currentPhoto = allPhotosArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    let image_url;
    let title;
    let description;
    let album_id;
    if (currentPhoto) {
        image_url = currentPhoto.image_url;
        title = currentPhoto.title;
        description = currentPhoto.description;
        album_id = currentPhoto.album_id;
    }

    const [editedImageUrl, setEditedImageUrl] = useState(image_url);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAlbumId, setEditedAlbumId] = useState(album_id);

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onSubmit = async e => {
        e.preventDefault();

        const editedPhoto = {
            id: currentPhoto.id,
            image_url: editedImageUrl,
            title: editedTitle,
            description: editedDescription,
            album_id: editedAlbumId,
        };
        const data = await dispatch(patchPhoto(editedPhoto));

        if (data) {
            setErrors(data);
            setEditedImageUrl(image_url);
            setEditedTitle(title);
            setEditedDescription(description);
            setEditedAlbumId(album_id);
        }

        if (!data) history.push(`/photos/${currentPhoto.id}`);
    };

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div
            style={{ backgroundImage: `url(${formBackgroundImage})` }}
            id="whole-login-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onSubmit} id="photo-form" className="forms">
                        <h1 className="form-heading">Edit Photo</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        <div className="form-label-input">
                            <label htmlFor="editedImage_url">Image URL</label>
                            <input
                                className="signup-login-fields"
                                id="editedImage_url"
                                type="text"
                                name="editedImage_url"
                                value={editedImageUrl}
                                onChange={e =>
                                    setEditedImageUrl(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="editedTitle">Photo title</label>
                            <input
                                className="signup-login-fields"
                                id="editedTitle"
                                type="text"
                                name="editedTitle"
                                value={editedTitle}
                                onChange={e => setEditedTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="editedDescription">
                                Description (optional)
                            </label>
                            <textarea
                                className="signup-login-fields"
                                id="editedDescription"
                                name="editedDescription"
                                value={editedDescription}
                                onChange={e =>
                                    setEditedDescription(e.target.value)
                                }
                                rows="20"
                                cols="80"
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="editedAlbum_id">
                                Select an album (optional)
                            </label>
                            <select
                                id="editedAlbum_id"
                                className="signup-login-fields"
                                name="editedAlbum_id"
                                value={editedAlbumId}
                                onChange={e =>
                                    setEditedAlbumId(e.target.value)
                                }
                            >
                                <option value="11">-optional-</option>
                                {sessionUserAlbums?.map((album, index) => (
                                    <option value={album?.id}>
                                        {album?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="business-buttons-container">
                            <div
                                onClick={onSubmit}
                                type="submit"
                                className="signup-login-button"
                            >
                                Edit
                            </div>
                            <div
                                type="button"
                                className="signup-login-button"
                                onClick={() =>
                                    history.push(`/photos/${currentPhoto.id}`)
                                }
                            >
                                Cancel
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPhotoForm;

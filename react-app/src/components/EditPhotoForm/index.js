import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { patchPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import { getPhotos } from "../../store/photo";
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

    let image;
    let title;
    let description;
    let album_id;
    if (currentPhoto) {
        image = currentPhoto.image;
        title = currentPhoto.title;
        description = currentPhoto.description;
        album_id = currentPhoto.album_id;
    }

    const [editedImage, setEditedImage] = useState(image);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAlbum_id, setEditedAlbum_id] = useState(album_id);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState("#");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    // const reset = () => {
    //     setTitle('')
    //     setDescription('')
    //     setAlbum_id()
    // }

    const onSubmit = async e => {
        e.preventDefault();

        const editedFormData = new FormData();

        editedFormData.append("image", editedImage);
        editedFormData.append("title", editedTitle);
        editedFormData.append("description", editedDescription);
        if (editedAlbum_id) editedFormData.append("album_id", editedAlbum_id);

        setImageLoading(true);

        const data = await dispatch(patchPhoto(editedFormData));

        if (data && data.errors) {
            setErrors(data.errors);
            setImageLoading(false);
        }

        if (!data.errors && album_id) {
            setImageLoading(false);
            // reset()
            history.push(`/albums/${album_id}`);
        } else history.push("/photostream");
    };

    const updateImage = e => {
        const file = e.target.files[0];
        setEditedImage(file);
        if (file) {
            setPhotoPrev(URL.createObjectURL(file));
        }
    };

    const onCancel = e => {
        return null;
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
                    <form onSubmit={onSubmit} id="photo-form">
                        <h1 className="form-heading">Edit Photo</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                        <div className="form-label-input" id="new-photo-image">
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                className="signup-login-fields"
                                type="file"
                                name="editedImage/*"
                                onChange={updateImage}
                                placeholder="Upload Image"
                                accept="image/png, image/jpeg, image/png, image/jpeg"
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
                                // placeholder="Title"
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="editedDscription">
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
                                // placeholder="Write a description"
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
                                value={editedAlbum_id}
                                onChange={e =>
                                    setEditedAlbum_id(e.target.value)
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
                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="signup-login-button"
                                // className="red buttons"
                                // id="create-business-button"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="signup-login-button"
                                // className="red buttons"
                                // id="create-business-button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            {imageLoading && <p>Loading...</p>} {/* add */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPhotoForm;

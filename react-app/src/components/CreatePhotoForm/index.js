import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import formBackgroundImage from "../../assets/cover-photo.jpeg";
import { formatError } from "../../helper";
import "./CreatePhotoForm.css";
import NavBar from "../NavBar";
import AddToAlbumsModal from "../AddToAlbumsModal";

const CreatePhotoForm = ({ sessionUser }) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    // let sessionUserAlbums;
    // if (allAlbumsObj) {
    //     const allAlbumsArr = Object?.values(allAlbumsObj);
    //     sessionUserAlbums = allAlbumsArr?.filter(
    //         album => album?.user_id === sessionUser?.id
    //     );
    // }

    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [albums, setAlbums] = useState([]);

    const srki = albums;

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    // const reset = () => {
    //     setTitle("");
    //     setDescription("");
    // };

    const onSubmit = async e => {
        e.preventDefault();
        const photo = {
            image_url: imageUrl,
            title,
            description,
            album_ids: albums,
        };

        const data = await dispatch(postPhoto(photo));

        if (data) setErrors(data);

        if (!data) history.push("/photostream");
    };

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div
            style={{ backgroundImage: `url(${formBackgroundImage})` }}
            className="whole-signup-login-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onSubmit} id="photo-form" className="forms">
                        <h1 className="form-heading">New Photo</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        <div className="form-label-input">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                className="signup-login-fields"
                                id="imageUrl"
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="title">Photo title</label>
                            <input
                                className="signup-login-fields"
                                id="title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="description">
                                Description (optional)
                            </label>
                            <textarea
                                className="signup-login-fields"
                                id="description"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows="20"
                                cols="80"
                            />
                        </div>
                        <div>
                            <AddToAlbumsModal
                                changeAlbums={albums => setAlbums(albums)}
                                srki={srki}
                            />
                        </div>
                        <div id="new-photo-list-of-albums">
                            {albums?.map(album => (
                                <div>{allAlbumsObj[album].title}</div>
                            ))}
                        </div>
                        <div className="business-buttons-container">
                            <div
                                onClick={onSubmit}
                                className="signup-login-button"
                            >
                                Create
                            </div>
                            <div
                                className="signup-login-button"
                                onClick={() => history.push("/photostream")}
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

export default CreatePhotoForm;

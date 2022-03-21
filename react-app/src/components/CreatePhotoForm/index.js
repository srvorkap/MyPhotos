import { useState, useEffect } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import formBackgroundImage from "../../assets/cover-photo.jpeg";
import { formatError } from "../../helper";
import "./CreatePhotoForm.css";
import NavBar from "../NavBar";

const CreatePhotoForm = ({ sessionUser }) => {
    const defaul =
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

    const srki = "https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014pg";

    const [imageUrl1, setImageUrl1] = useState(srki);

    const onError = () => {
        setImageUrl1(defaul);
    };

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    const [image_url, setImage_url] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [album_id, setAlbum_id] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState("#");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const reset = () => {
        setTitle("");
        setDescription("");
        setAlbum_id();
    };

    const onSubmit = async e => {
        e.preventDefault();
        const photo = {
            image_url,
            title,
            description,
            album_id
        }
        // let photo;
        // if (album_id) {
        //     photo = {
        //         image_url: imageUrl,
        //         title,
        //         description,
        //         album_id
        //     };
        // } else {
        //     photo = {
        //         image_url: imageUrl,
        //         title,
        //         description,
        //     };

        const data = await dispatch(postPhoto(photo));

        if (data) setErrors(data);

        if (!data && album_id) history.push(`/albums/${album_id}`);
        else if (!data && !album_id) history.push("/photostream");
    };

    // const onSubmit = async e => {
    //     e.preventDefault();

    //     const formData = new FormData();

    //     formData.append("image", image);
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     if (album_id) formData.append("album_id", album_id);

    //     setImageLoading(true);

    //     const data = await dispatch(postPhoto(formData));

    //     if (data && data.errors) {
    //         setErrors(data.errors);
    //         setImageLoading(false);
    //     }

    //     if (!data.errors && album_id) {
    //         setImageLoading(false);
    //         reset();
    //         history.push(`/albums/${album_id}`);
    //     } else history.push("/photostream");
    // };

    // const updateImage = e => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //     if (file) {
    //         setPhotoPrev(URL.createObjectURL(file));
    //     }
    // };

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
                        <h1 className="form-heading">New Photo</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        {/* <div className="form-label-input" id="new-photo-image">
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                className="signup-login-fields"
                                type="file"
                                name="image/*"
                                onChange={updateImage}
                                // placeholder="Upload Image"
                                accept="image/png, image/jpeg, image/png, image/jpeg"
                            />
                        </div> */}
                        {/* <img src={imageUrl} onError={onError} /> */}
                        <div className="form-label-input">
                            <label htmlFor="image_url">Image URL</label>
                            <input
                                className="signup-login-fields"
                                id="image_url"
                                type="text"
                                name="image_url"
                                value={image_url}
                                onChange={e => setImage_url(e.target.value)}
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
                                // placeholder="Title"
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
                                // placeholder="Write a description"
                                rows="20"
                                cols="80"
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="album_id">
                                Select an album (optional)
                            </label>
                            <select
                                className="signup-login-fields"
                                id="album_id"
                                name="album_id"
                                value={album_id}
                                onChange={e => setAlbum_id(e.target.value)}
                            >
                                <option value="11">-optional-</option>
                                {sessionUserAlbums?.map(album => (
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
                                // className="red buttons"
                                // id="create-business-button"
                            >
                                Create
                            </div>
                            <div
                                type="button"
                                className="signup-login-button"
                                // className="red buttons"
                                // id="create-business-button"
                                onClick={() => history.push("/photostream")}
                            >
                                Cancel
                            </div>
                            {imageLoading && <p>Loading...</p>} {/* add */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePhotoForm;

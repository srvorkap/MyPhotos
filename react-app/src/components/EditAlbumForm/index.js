import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAlbums, patchAlbum } from "../../store/album";
import formBackgroundImage from "../../assets/cover-photo.jpeg";
import NavBar from "../NavBar";
import { formatError } from "../../helper";
import "./EditAlbumForm.css";

const EditAlbumForm = ({ sessionUser }) => {
    const { albumId } = useParams();
    const albumIdNumerical = +albumId;

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let currentAlbum;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        currentAlbum = allAlbumsArr?.find(
            album => album?.id === albumIdNumerical
        );
    }

    let title;
    let description
    if (currentAlbum) {
        title = currentAlbum.title
        description = currentAlbum.description
    }

    // const { title, description } = currentAlbum;

    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
        const editedAlbum = {
            id: currentAlbum.id,
            title: editedTitle,
            description: editedDescription,
        };
        const data = await dispatch(patchAlbum(editedAlbum));

        if (data) {
            setErrors(data);
            setEditedTitle(title);
            setEditedDescription(description);
        }

        if (!data) history.push(`/albums/${currentAlbum.id}`);
        // if (data && data.errors) {
        //     setErrors(data.errors);

        //     setEditedTitle(title);
        //     setEditedDescription(description);
        // }
        // if (!data.errors) history.push(`/albums/${currentAlbum.id}`);
    };

    const onCancel = e => {
        e.preventDefault();
        history.push(`/albums/${currentAlbum.id}`);
    };

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div
            style={{ backgroundImage: `url(${formBackgroundImage})` }}
            id="whole-login-page"
        >
            <NavBar />
            <div className="signup-login-page">
                <div className="signup-login-form">
                    <form onSubmit={onSubmit} id="login-form">
                        <h1 className="form-heading">Edit Album</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        <div className="form-label-input">
                            <label htmlFor="editedTitle">Album title</label>
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
                            <label htmlFor="editedDescription">
                                Description (optional)
                            </label>
                            <textarea
                                className="signup-login-fields"
                                id="editedDescription"
                                type="text"
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
                        <div className="business-buttons-container">
                            <div
                                className="signup-login-button"
                                onClick={onSubmit}
                                type="submit"
                                // className="red buttons"
                                // id="create-business-button"
                            >
                                Edit
                            </div>
                            <div
                                className="signup-login-button"
                                type="button"
                                // className="red buttons"
                                // id="create-business-button"
                                onClick={onCancel}
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

export default EditAlbumForm;

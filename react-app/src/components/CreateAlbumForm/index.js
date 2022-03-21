import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postAlbum } from "../../store/album";
import { formatError } from "../../helper";
import formBackgroundImage from "../../assets/cover-photo.jpeg";
import NavBar from "../NavBar";
import './CreateAlbumForm.css'

const CreateAlbumForm = ({ sessionUser }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
        const album = {
            title,
            description,
        };
        const data = await dispatch(postAlbum(album));

        if (data) setErrors(data);

        if (!data) history.push("/albums");
    };

    const onCancel = e => {
        e.preventDefault();
        history.push("/albums");
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
                    <form onSubmit={onSubmit} id='login-form'>
                        <h1 className="form-heading">New Album</h1>
                        <ul className="errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        <div className="form-label-input">
                            <label htmlFor="title">Album title</label>
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
                                id="description"
                                className="signup-login-fields"
                                type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
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
                                Create
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

export default CreateAlbumForm;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postAlbum } from "../../store/album";
import { formatError } from "../../helper";

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
        <div className="signup-login-page">
            <div className="signup-login-form">
                <h1>Add New Album</h1>
                <form onSubmit={onSubmit}>
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{formatError(error)}</li>
                        ))}
                    </ul>
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Write a description"
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
    );
};

export default CreateAlbumForm;

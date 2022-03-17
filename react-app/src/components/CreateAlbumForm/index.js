import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postAlbum } from "../../store/album";

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
            description
        }
        const data = await dispatch(postAlbum(album))

        if (data && data.errors) setErrors(data.errors)

        if (!data.errors) history.push('/albums')
    };

    const onCancel = e => {
        e.preventDefault();
        history.goBack();
    };

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div>
            <div>
                <h1>Add New Album</h1>
                <form onSubmit={onSubmit}>
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Title'
                        />
                    </div>
                    <div>
                        <textarea
                        type='text'
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Write a description'
                        rows='20'
                        cols='80'
                        />
                    </div>
                    <div className="business-buttons-container">
                        <button
                            onClick={onSubmit}
                            type="submit"
                            // className="red buttons"
                            // id="create-business-button"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            // className="red buttons"
                            // id="create-business-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAlbumForm;

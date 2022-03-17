import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

const CreateAlbumForm = ({ sessionUser }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
    };

    if (!sessionUser) return <Redirect to="/" />;

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
                            onChange={e => e.target.value}
                            placeholder='Title'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAlbumForm;

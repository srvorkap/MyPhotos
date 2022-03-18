import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";

const CreatePhotoForm = ({ sessionUser }) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    console.log(sessionUserAlbums)

    const [image_url, setImage_url] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [album_id, setAlbum_id] = useState()

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const onSubmit = async e => {
        e.preventDefault();
        const photo = {
            image_url,
            title,
            description,
            album_id
        };
        const data = await dispatch(postPhoto(photo));

        if (data && data.errors) setErrors(data.errors);

        if (!data.errors && album_id) history.push(`/albums/${album_id}`);
        else history.push('/photostream')
    };

    const onCancel = e => {
        return null;
    };

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            <div>
                <h1>Add New Photo</h1>
                <form onSubmit={onSubmit}>
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <input
                            type="text"
                            name="image_url"
                            value={image_url}
                            onChange={e => setImage_url(e.target.value)}
                            placeholder="Image"
                        />
                    </div>
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
                            // type="text"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Write a description"
                            rows="20"
                            cols="80"
                        />
                    </div>
                    <div>
                        <select
                            name="album_id"
                            value={album_id}
                            onChange={e => setAlbum_id(e.target.value)}
                        >
                            <option value='11'>Select an album</option>
                            {sessionUserAlbums?.map((album, index) => (
                                <option value={index+1}>{album?.title}</option>
                            ))}
                        </select>
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

export default CreatePhotoForm;

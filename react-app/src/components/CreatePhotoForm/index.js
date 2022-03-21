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

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [album_id, setAlbum_id] = useState()
    const [imageLoading, setImageLoading] = useState(false)
    const [photoPrev, setPhotoPrev] = useState('#')

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const reset = () => {
        setTitle('')
        setDescription('')
        setAlbum_id()
    }

    const onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('description', description)
        if (album_id) formData.append('album_id', album_id)

        setImageLoading(true)

        const data = await dispatch(postPhoto(formData));

        if (data && data.errors) {
            setErrors(data.errors);
            setImageLoading(false)
        }

        if (!data.errors && album_id) {
            setImageLoading(false)
            reset()
            history.push(`/albums/${album_id}`)
        } else history.push('/photostream')
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPhotoPrev(URL.createObjectURL(file))
        }
    }

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
                            type="file"
                            name="image/*"
                            onChange={updateImage}
                            placeholder="Upload Image"
                            accept='image/png, image/jpeg, image/png, image/jpeg'
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
                            {sessionUserAlbums?.map((album) => (
                                <option value={album.id}>{album?.title}</option>
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
                        {imageLoading && <p>Loading...</p>} {/* add */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePhotoForm;

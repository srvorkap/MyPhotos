import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { patchPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import { getPhotos } from "../../store/photo";

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

    console.log(currentPhoto)

    // let image
    let title
    let description
    let album_id
    if (currentPhoto) {
        // image = currentPhoto.image
        title = currentPhoto.title
        description = currentPhoto.description
        album_id = currentPhoto.album_id
    }

    // const [editedImage, setEditedImage] = useState(image);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAlbum_id, setEditedAlbum_id] = useState(album_id)
    const [imageLoading, setImageLoading] = useState(false)
    const [photoPrev, setPhotoPrev] = useState('#')

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

        const editedFormData = new FormData()

        // formData.append('image', image)
        editedFormData.append('title', editedTitle)
        editedFormData.append('description', editedDescription)
        if (album_id) editedFormData.append('album_id', editedAlbum_id)

        setImageLoading(true)

        const data = await dispatch(patchPhoto(editedFormData));

        if (data && data.errors) {
            setErrors(data.errors);
            setImageLoading(false)
        }

        if (!data.errors && album_id) {
            setImageLoading(false)
            // reset()
            history.push(`/albums/${album_id}`)
        } else history.push('/photostream')
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        // setImage(file);
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
                <h1>Edit Photo</h1>
                <form onSubmit={onSubmit}>
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    {/* <div>
                        <input
                            type="file"
                            name="image/*"
                            onChange={updateImage}
                            placeholder="Upload Image"
                            accept='image/png, image/jpeg, image/png, image/jpeg'
                        />
                    </div> */}
                    <div>
                        <input
                            type="text"
                            name="editedTitle"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <textarea
                            name="editedDescription"
                            value={editedDescription}
                            onChange={e => setEditedDescription(e.target.value)}
                            placeholder="Write a description"
                            rows="20"
                            cols="80"
                        />
                    </div>
                    <div>
                        <select
                            name="editedAlbum_id"
                            value={editedAlbum_id}
                            onChange={e => setEditedAlbum_id(e.target.value)}
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
                        {imageLoading && <p>Loading...</p>} {/* add */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPhotoForm;

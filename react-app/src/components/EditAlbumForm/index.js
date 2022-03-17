import { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { patchAlbum } from "../../store/album";

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

    const { title, description } = currentAlbum

    const [editedTitle, setEditedTitle] = useState(title)
    const [editedDescription, setEditedDescription] = useState(description)

    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = async e => {
        e.preventDefault()
        const editedAlbum = {
            id: currentAlbum.id,
            title: editedTitle,
            description: editedDescription,
        }
        const data = await dispatch(patchAlbum(editedAlbum))
        if (data && data.errors) {
            setErrors(data.errors)

            setEditedTitle(title)
            setEditedDescription(description)
        }
        if (!data.errors) history.push(`/albums/${currentAlbum.id}`)

    }

    if (!sessionUser) return <Redirect to='/' />
    return (
        <div>
            <div>
                <h1>Edit Album</h1>
                <form onSubmit={onSubmit}>
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <input
                            type="text"
                            name="editedTitle"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                            placeholder='Title'
                        />
                    </div>
                    <div>
                        <textarea
                        type='text'
                        name="editedDescription"
                        value={editedDescription}
                        onChange={e => setEditedDescription(e.target.value)}
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
                            Edit
                        </button>
                        {/* <button
                            type="button"
                            // className="red buttons"
                            // id="create-business-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAlbumForm

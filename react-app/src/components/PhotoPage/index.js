import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPhotos } from "../../store/photo";

const PhotoPage = ({ sessionUser }) => {
    const { photoId } = useParams();
    const photoIdNumerical = +photoId;

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentPhoto;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        console.log(allPhotosArr);
        currentPhoto = allPhotosArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onEdit = e => {
        e.preventDefault();
        history.push(`/photos/${currentPhoto.id}/edit`);
    }

    const onDelete = e => {
        e.preventDefault();
        dispatch(deletePhoto(currentPhoto.id));
    }

    const onBack = e => {
        e.preventDefault();
        history.push(`/albums/${currentPhoto.album_id}`);
    };

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            <div onClick={onBack}>Back to album</div>
            <div>
                <h1>{currentPhoto?.title}</h1>
                <img src={currentPhoto?.image_url} />
                <button
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                    >
                        Delete
                    </button>
            </div>
        </div>
    );
};

export default PhotoPage;

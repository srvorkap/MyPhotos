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
            </div>
        </div>
    );
};

export default PhotoPage;

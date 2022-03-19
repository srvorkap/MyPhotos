import { useEffect } from "react";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPhotos } from "../../store/photo";
import { getAlbums } from "../../store/album";

const AlbumPage = ({ sessionUser }) => {
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

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentAlbumPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        currentAlbumPhotos = allPhotosArr?.filter(
            photo => photo?.album_id === albumIdNumerical
        );
    }

    currentAlbumPhotos?.reverse()

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onBack = e => {
        e.preventDefault();
        history.push("/albums");
    };

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            <div onClick={onBack}>Back to albums list</div>
            <h1>{currentAlbum?.title}</h1>
            {currentAlbumPhotos?.map(photo => (
                <div>
                    <NavLink to={`/photos/${photo.id}`}>
                        <div>{photo?.title}</div>
                        <img src={photo?.image_url} />
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default AlbumPage;

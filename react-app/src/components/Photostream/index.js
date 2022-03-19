import { NavLink, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";

const Photostream = ({ sessionUser }) => {
    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === sessionUser?.id
        );
    }

    sessionUserPhotos?.reverse()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            {sessionUserPhotos?.map(photo => (
                <NavLink to={`/photos/${photo.id}`} key={photo.id}>
                    <h1>{photo.title}</h1>
                    <img src={photo.image_url} />
                </NavLink>
            ))}
        </div>
    );
};

export default Photostream;

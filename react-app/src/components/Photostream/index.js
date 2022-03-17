import { NavLink, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";

const Photostream = ({ sessionUser }) => {
    const allPhotosArr = useSelector(store => store?.photo?.photos);
    console.log("----------------", allPhotosArr);
    let sessionUserPhotos;
    if (allPhotosArr) {
        // const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            // photo => console.log(typeof photo.user_id)
            photo => photo?.user_id === sessionUser?.id
        );
    }
    console.log("000000000000000", sessionUserPhotos);
    // console.log('photo.user_id', photo?.user_id)
    console.log("sessionUser.id", typeof sessionUser?.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            {sessionUserPhotos?.map(photo => (
                <NavLink to={`/photos/${photo.id}`}>
                    <h1>{photo.title}</h1>
                    <img src={photo.image_url} />
                </NavLink>
            ))}
        </div>
    );
};

export default Photostream;

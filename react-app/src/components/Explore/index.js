import { Redirect, NavLink } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";

const Explore = ({ sessionUser }) => {
    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let otherUsersPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        otherUsersPhotos = allPhotosArr?.filter(
            photo => photo?.user_id !== sessionUser?.id
        );
    }

    // const allPhotosObj = useSelector(store => store?.photo?.photos);
    // const allPhotosArr = Object?.values(allPhotosObj);
    // const otherUsersPhotos = allPhotosArr?.filter(
    //         photo => photo?.user_id !== sessionUser?.id
    //     );


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to='/login' />
    return (
        <div>
            {otherUsersPhotos?.map(photo => (
                <NavLink to={`/photos/${photo.id}`} key={photo.id}>
                    <h1>{photo.title}</h1>
                    <img src={photo.image_url} />
                </NavLink>
            ))}
        </div>
    );
}

export default Explore

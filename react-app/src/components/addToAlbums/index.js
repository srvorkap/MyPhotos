import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAlbums } from "../../store/album";

const AddToAlbums = ({ sessionUser }) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    const [id, setId] = useState([])

    const onClick = () => {

    }

    const srki = (id) => id
    console.log(srki())

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);
    return (
        <div>
            {sessionUserAlbums?.map(album => (
                <div onClick={() => {
                    id.push(album.id)
                    console.log(id)
                }}>{album.title}</div>
            ))}
        </div>
    )
};

export default AddToAlbums;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAlbums } from "../../store/album";
import '../AddToAlbums/AddToAlbums.css'

const AddToAlbums = ({ sessionUser }) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }
    const dispatch = useDispatch();
    const history = useHistory()

    const [albums, setAlbums] = useState([])
    console.log(albums)

    const onClick = () => {
        console.log(albums)
    }


    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);
    return (
        <div onClick={onClick}>
            {sessionUserAlbums?.map(album => (
                <div onClick={() => {
                    if (albums.indexOf(album.id) === -1) {
                        setAlbums([...albums, album.id])
                    } else {
                        albums.splice(albums.indexOf(album.id), 1)
                        setAlbums([...albums])
                    }
                }}>
                    <div>{album.title}</div>
                    <div id={albums.indexOf(album.id) === -1 ? 'not-check-mark' : 'check-mark'}></div>
                </div>
            ))}
        </div>
    )
};

export default AddToAlbums;

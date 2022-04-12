import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAlbums } from "../../store/album";
import "./AddToAlbums.css";

const AddToAlbums = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(store => store?.session?.user);

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }
    const dispatch = useDispatch();
    const history = useHistory();


    const [albums, setAlbums] = useState([]);
    console.log(albums)

    const onDone = () => {
        setAlbums(albums)
        props.changeShowModal(false)
        props.changeAlbums(albums)
    }

    useEffect(() => {
        dispatch(getAlbums());
        setIsLoaded(true);
    }, []);
    return (
        <div>
            {isLoaded &&
                sessionUserAlbums?.map(album => (
                    <div
                        onClick={() => {
                            if (albums.indexOf(album.id) === -1) {
                                setAlbums([...albums, album.id]);
                            } else {
                                albums.splice(albums.indexOf(album.id), 1);
                                setAlbums([...albums]);
                            }
                        }}
                    >
                        <div>{album.title}</div>
                        <div
                            id={
                                albums.indexOf(album.id) === -1
                                    ? "not-check-mark"
                                    : "check-mark"
                            }
                        ></div>
                    </div>
                ))}
                <div onClick={onDone}>Done</div>
        </div>
    );
};

export default AddToAlbums;

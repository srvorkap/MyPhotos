import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAlbums } from "../../store/album";
import "./AddToAlbums.css";

const AddToAlbums = props => {
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

    const [albums, setAlbums] = useState(props.srki2);
    console.log(albums);

    const onDone = () => {
        setAlbums(albums);
        props.changeShowModal(false);
        props.changeAlbums(albums);
    };

    useEffect(() => {
        dispatch(getAlbums());
        setIsLoaded(true);
    }, []);
    return (
        <div id="add_to_albums_modal">
            <div id="add_to_albums_modal_header">
                <h3 id="add_to_albums_modal_header_h3">
                    Add this photo to albums
                </h3>
            </div>
            <div id="add_to_albums_modal_content">
                <div id="add_to_albums_list">
                    {isLoaded &&
                        sessionUserAlbums?.map(album => (
                            <div className="add_to_albums_list_elements"
                                onClick={() => {
                                    if (albums.indexOf(album.id) === -1) {
                                        setAlbums([...albums, album.id]);
                                    } else {
                                        albums.splice(
                                            albums.indexOf(album.id),
                                            1
                                        );
                                        setAlbums([...albums]);
                                    }
                                }}
                            >
                                <div className="add_to_albums_list_elements_title">{album.title}</div>
                                <div className="add_to_albums_list_elements_title_check-mark">
                                    {albums.indexOf(album.id) === -1 ? null : (
                                        <i
                                            class="fas fa-check check-mark"
                                        ></i>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
                <div onClick={onDone} id='add_to_albums_modal_done_button'>Done</div>
            </div>
        </div>
    );
};

export default AddToAlbums;

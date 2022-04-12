import { useState, useEffect } from 'react'
import AddToAlbums from '../AddToAlbums'
import { Modal } from '../../context/Modal'
import './AddToAlbumsModal.css'

const AddToAlbumsModal = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [albums, setAlbums] = useState(props.srki)

    const srki2 = albums

    useEffect(() => {
        props.changeAlbums(albums)
    })

    return (
        <>
            <h4 id='add_to_albums_button' onClick={() => setShowModal(true)}>Add to albums (optional)</h4>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddToAlbums changeShowModal={showModal => setShowModal(showModal)} srki2={srki2}
                    changeAlbums={albums => setAlbums(albums)}/>
                </Modal>
            )}
        </>
    )
}

export default AddToAlbumsModal

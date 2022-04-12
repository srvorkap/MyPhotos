import { useState, useEffect } from 'react'
import AddToAlbums from '../AddToAlbums'
import { Modal } from '../../context/Modal'

const AddToAlbumsModal = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [albums, setAlbums] = useState([])

    console.log('gore', albums)

    useEffect(() => {
        props.changeAlbums(albums)
    })

    return (
        <>
            <div onClick={() => setShowModal(true)}>Add to albums</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddToAlbums changeShowModal={showModal => setShowModal(showModal)}
                    changeAlbums={albums => setAlbums(albums)}/>
                </Modal>
            )}
        </>
    )
}

export default AddToAlbumsModal

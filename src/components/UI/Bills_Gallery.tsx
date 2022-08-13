import React, { useState } from 'react'
import { StyledBills } from '../../styles/Bills.styled'
import Modal from './Modal'
import classes from '../../styles/Modal.module.css'

interface Props {
    images: any[],
}
const BillsGallery: React.FC<Props> = ({ images }) => {
    const [openImagesModal, setOpenImagesModal] = useState(false)
    const firstFiveImages = images.slice(0, 5)
    return (
        <>
            <Modal styles={'w-full sm:w-8/12 max-h-full overflow-scroll '} open={openImagesModal} close={() => setOpenImagesModal(false)}>
                <div className="gap-5 grid">
                    {images.map((image: string) => {
                        return <div key={image} className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden ">
                            <img

                                src={image}
                                alt={'Bils'}
                                className={classes['img']}
                            />
                        </div>
                    })}

                </div>
            </Modal>
            <StyledBills onClick={() => setOpenImagesModal(true)}>
                {firstFiveImages.map((image, index) =>
                    <div key={index} style={{ aspectRatio: '1' }}>
                        <img src={image} />
                    </div>

                )}
                {images.length > 4 && <div style={{ aspectRatio: '1' }}>
                    + {images.length - 4} More
                </div>}
            </StyledBills>
        </>
    )
}

export default BillsGallery
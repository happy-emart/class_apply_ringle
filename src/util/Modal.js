import { useState } from "react";
import Modal from "react-modal";

export function ModalFunc({ title, content, setValue, modalOpen, setModalOpen, other }) {

    console.log("Here.", title);

    const onClick = (boolV) => () => {
        setValue(boolV);
        setModalOpen(false);
    };

    const style = {
        content: {
            width: "500px",
            height: "250px",
            borderRadius: "5px",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    return (
        <Modal isOpen={modalOpen} style={style} onRequestClose={() => setModalOpen(false)}>
            <div className="bold-200 my-3">{title}</div>
            <div className="regular-400 my-3 mb-10">{content}</div>

            {other ?
                <div className="inline-flex w-full flex-row justify-end">
                    <div className="regular-400 w-28 h-10 bg-gray-200 rounded-full shadow-lg inline-flex justify-center items-center mx-1 hover:bg-ringle-purple hover:text-white" onClick={onClick(true)}>예</div>
                    <div className="regular-400 w-28 h-10 bg-gray-200 rounded-full shadow-lg inline-flex justify-center items-center mx-1 hover:bg-ringle-purple hover:text-white" onClick={onClick(false)}>아니오</div>
                </div> :
                <div className="regular-400 w-28 h-10 bg-gray-200 rounded-full shadow-lg inline-flex justify-center items-center mx-1 hover:bg-ringle-purple hover:text-white" onClick={onClick(false)}>창 닫기</div>
            }
        </Modal>
    )
}
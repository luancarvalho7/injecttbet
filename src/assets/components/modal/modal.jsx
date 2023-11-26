import React from 'react';
import { useState, useEffect } from 'react';
import './modal.css';

import diamond from '../../images/diamond.png'

function Modal({ isOpen, setShowModal }) {
    if (!isOpen) return null;

    function onClose() {
        setShowModal(false)
    }

    const [animRun, setAnimRun] = useState(false)

    useEffect(()=>{

        setTimeout(()=>{setAnimRun(true)}, 5)

    }, [])
    return (
        <div className={ animRun ? `modalOverlay` : `modalOverlay mo-before`}>
        <div className={ animRun ? `modal` : `modal m-before`}>
            <div className="modal-content">
                <div className="modal-header">
                    <img src={diamond}width={150} alt="Acesso VIP" />
                    <h1><strong>Acesso VIP</strong></h1>
                </div>
                <div className="modal-body">
                    <p>Monitore todas as casas, tenha acesso ao sistema de todos os fornecedores e veja os melhores jogos.</p>
                </div>
                <div className="modal-footer">
                    <button className="vip-button"><a href="https://checkout.perfectpay.com.br/pay/PPU38CNDESA"><strong>QUERO SER VIP</strong></a></button>
                    <button className="close-button" onClick={onClose}>Não, obrigado</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Modal;

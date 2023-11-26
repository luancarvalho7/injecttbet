import React, { useEffect, useRef } from 'react';

export function FrustrarProgressBar({ valorVariavel, quality }) {

    const progressBarRef = useRef(null);

    useEffect(() => {
        const largura = `${valorVariavel * 1.5}%`;
        progressBarRef.current.style.width = largura;
    }, [valorVariavel]);

    return (
        <div className={`fprogress-bar pg-${quality}`}>
            <div className={`fprogress-value pgv-${quality}`}><p>{valorVariavel+'%'}</p></div>
            <div className={`fprogress-fill pgf-${quality}`} ref={progressBarRef}></div>
        </div>
    );
};


import React, { useEffect, useRef } from 'react';

export function ProgressBar({ valorVariavel, quality }) {

    const progressBarRef = useRef(null);

    useEffect(() => {
        const largura = `${valorVariavel * 1.5}%`;
        progressBarRef.current.style.width = largura;
    }, [valorVariavel]);

    return (
        <div className={`gprogress-bar pg-${quality}`}>
            <div className={`gprogress-value pgv-${quality}`}><p>{valorVariavel+'%'}</p></div>
            <div className={`gprogress-fill pgf-${quality}`} ref={progressBarRef}></div>
        </div>
    );
};


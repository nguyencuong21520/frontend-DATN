import React, { useEffect } from 'react';
import './style.scss';

export const ErrorPage = () => {
    useEffect(() => {
        document.title = '404 Lỗi (o_o)'
    }, [])
    return (
        <div className="note-found-page">
            <section id="not-found">
                <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
                <div className="circles">
                    <p>
                        404
                        <br />
                        <small>PAGE NOT FOUND</small>
                    </p>
                    <span className="circle big"></span>
                    <span className="circle med"></span>
                    <span className="circle small"></span>
                </div>
            </section>
        </div>
    )
}

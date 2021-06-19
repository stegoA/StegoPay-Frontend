import React from 'react';
import './styles/Download_StegoPay.css';
import illustration from '../Download_StegoPay_Illustration.svg';
import googlePlayBadge from '../google-play-badge.png';



function Download_StegoPay() {
    return (
        <div>
            <div className="downloadStegoPayText">
                Download StegoPay to get started.
            </div>

            <img className="illustration" src={illustration} alt="Download_StegoPay_Illustration" />
            <img className="googlePlayBadge" src={googlePlayBadge} alt="Google_Play_Badge" />

        </div>
    )
}

export { Download_StegoPay };
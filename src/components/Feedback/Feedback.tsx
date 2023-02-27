import React from 'react';
import Footer from '../Footer/Footer.tsx';
const { useTranslation } = require('react-i18next');
import DoneTick from '../../assets/img/green-tick.png';

import './Feedback.scss';

export default function Feedback() {
    const { t } = useTranslation();
    return (
        <div className="feedback">
            <div className="feedback-content">
                <div className="content">
                    <img src={DoneTick} />
                    <div className='text'>
                        <h5 className='sub-title'>{t('sub_title_feedback')}</h5>
                        <p>{t('lorem_ipsum')}</p>
                    </div>
                </div>
                <Footer prevNumber={2} nextNumber={4} />
            </div>
        </div>
    )
}
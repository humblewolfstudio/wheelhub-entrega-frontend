import React, { useContext } from 'react';
import WheelHubLogo from '../../assets/img/Logotipo-Vertical-Verde-Alta.png';
import Footer from '../Footer/Footer.tsx';
import Title from '../Title/Title.tsx';
import { CurrentPageContext } from '../../types/types';
import { CurrentContext } from '../../App.tsx';
const { useTranslation } = require('react-i18next');

import './Introduction.scss'

export default function Introdution() {
    const { t } = useTranslation();
    const Context: CurrentPageContext = useContext(CurrentContext);
    return (
        <div className='introduction'>
            <div className="introduction-content">
                <Title />
                <img className='logo-image' src={WheelHubLogo} alt={'Logo Wheelhub'}></img>
                <h5 className='sub-title'>{t('sub-title')}</h5>
                <div className="content">
                    <p>{t('first-paragraph')}</p>
                    <p>{t('second-paragraph')}</p>
                    <p>{t('third-paragraph')}</p>
                    <div className="privacy-policy">
                        <input type='checkbox' checked={Context.policyChecked} onChange={e => Context.setPolicyChecked(e.target.checked)} />
                        <p aria-labelledby='policy checkbox' onChange={e => Context.setPolicyChecked(!Context.policyChecked)}>{t('policy-paragraph')}</p>
                    </div>
                </div>
                <Footer prevNumber={0} nextNumber={2} activateNext={Context.policyChecked} />
            </div>
        </div>
    )
}
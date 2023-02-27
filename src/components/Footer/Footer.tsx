import React, { useContext } from "react";
import { CurrentContext } from "../../App.tsx";
import { CurrentPageContext } from "../../types/types";

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faAngleRight } = require('@fortawesome/free-solid-svg-icons');

import './Footer.scss'
const { useTranslation } = require("react-i18next");

const angleRight = <FontAwesomeIcon icon={faAngleRight} size="2x" />

interface FooterProps {
    prevNumber: number,
    nextNumber: number,
    activateNext: boolean,
    submitFunction?: Function,
    showSpinner: boolean
}

export default function Footer(props: FooterProps) {
    const { t } = useTranslation();
    const Context: CurrentPageContext = useContext(CurrentContext);
    return (
        <div className="footer">
            <div className="footer-content">
                {props.prevNumber != 0 && <button className='prev-button' onClick={() => Context.setCurrent(props.prevNumber)}><h3>&lt;</h3>{t('back_button')} </button> || <div />}
                {props.nextNumber == 4 && <button className='start-button' onClick={() => Context.setCurrent(1)}>{t('home_button')}</button>}
                {props.nextNumber != 0 && props.nextNumber != 4 && props.activateNext && <button className='next-button' onClick={() => props.submitFunction ? props.submitFunction() : Context.setCurrent(props.nextNumber)}>{t('next_button')} {angleRight} {props.showSpinner ? <span className="loader" ></span> : null}</button> || null}
                {props.nextNumber != 0 && props.nextNumber != 4 && !props.activateNext && <button disabled className='next-button-disabled' onClick={() => Context.setCurrent(props.nextNumber)}>{t('next_button')} {angleRight}</button> || null}
            </div>
        </div >
    )
}
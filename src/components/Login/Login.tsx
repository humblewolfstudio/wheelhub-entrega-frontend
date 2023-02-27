import React, { useContext, useState } from 'react';
import Footer from '../Footer/Footer.tsx'
import Title from '../Title/Title.tsx';
import { CurrentContext } from '../../App.tsx';
import { CurrentPageContext } from '../../types/types';
const { useTranslation } = require('react-i18next');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faEye, faEyeSlash } = require('@fortawesome/free-solid-svg-icons');
import { calculateStrength, createUser } from "./Login.utility.tsx";

import axios from 'axios';

import './Login.scss';

const eye = <FontAwesomeIcon icon={faEye} />
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />

export default function Login() {
    const { t } = useTranslation();
    const Context: CurrentPageContext = useContext(CurrentContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [pista, setPista] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [strongPassword, setStrongPassword] = useState(0);
    const [showSpinner, setShowSpinner] = useState(false);

    const userInput = React.useRef<HTMLInputElement>(null);
    const userError = React.useRef<HTMLParagraphElement>(null);
    const passwordInput = React.useRef<HTMLInputElement>(null);
    const passwordError = React.useRef<HTMLParagraphElement>(null);
    const passwordRepeatInput = React.useRef<HTMLInputElement>(null);
    const passwordRepeatError = React.useRef<HTMLParagraphElement>(null);
    const pistaInput = React.useRef<HTMLInputElement>(null);
    const pistaError = React.useRef<HTMLParagraphElement>(null);
    const pistaCounter = React.useRef<HTMLLabelElement>(null);
    const progressBar = React.useRef<HTMLProgressElement>(null);
    const reqError = React.useRef<HTMLParagraphElement>(null);

    const handlePista = (event: any) => {
        var _pista = event.target.value;
        var nCharacters = _pista.length;
        var counter: HTMLLabelElement = pistaCounter.current!;
        if (nCharacters > 60) counter.style.color = "red";
        else counter.style.color = "";
        counter.innerHTML = `${nCharacters}/60`;

        setPista(_pista);
    }

    const handleSubmit = async (event: any) => {
        var p: HTMLParagraphElement = reqError.current!;

        p.innerHTML = t('no_error');

        var userValidation = handleUsernameError();
        if (!userValidation) return;
        var passwordValidation = handlePasswordError();
        if (!passwordValidation) return;
        var passwordRepeatValidation = handlePasswordRepeatError();
        if (!passwordRepeatValidation) return;
        var pistaValidation = handlePistaError();
        if (!pistaValidation) return;
        setShowSpinner(true);
        var userCreated = await createUser(username, password)
        if (userCreated) Context.setCurrent(3);
        else {
            p.innerHTML = t('req_error');
        }
    }

    const handleUsernameError = () => {
        const input: HTMLInputElement = userInput.current!;
        const error: HTMLParagraphElement = userError.current!;
        if (username == "") {
            input.className += " bad-input";
            error.innerHTML = t('required_field');
            return false;
        } else {
            input.className = "wide-input";
            error.innerHTML = t('no_error');
            return true;
        }
    }

    const handlePasswordError = () => {
        const input: HTMLInputElement = passwordInput.current!;
        const error: HTMLParagraphElement = passwordError.current!;
        if (password == "") {
            showError(input, error, "bad-input", t('required_field'));
            return false;
        } else if (!(/\d/.test(password))) {
            console.log("numero error")
            showError(input, error, "bad-input", t('password_input_error_number'));
            return false;
        } else if (!(/[A-Z]/.test(password))) {
            showError(input, error, "bad-input", t('password_input_error_capital'));
            return false;
        } else if (password.length < 8) {
            showError(input, error, "bad-input", t('password_input_error_min_characters'));
            return false;
        } else if (password.length > 24) {
            showError(input, error, "bad-input", t('password_input_error_max_characters'));
            return false;
        } else {
            showError(input, error, "", t('no_error'));
            return true;
        }
    }

    const handlePasswordRepeatError = () => {
        const input: HTMLInputElement = passwordRepeatInput.current!;
        const error: HTMLParagraphElement = passwordRepeatError.current!;

        if (passwordRepeat == "") {
            showError(input, error, "bad-input", t('required_field'));
            return false;
        } else if (passwordRepeat != password) {
            showError(input, error, "bad-input", t('password_repeat_input_error_same'));
            return false;
        } else {
            showError(input, error, "", t('no_error'));
            return true;
        }
    }

    const handlePistaError = () => {
        const input: HTMLInputElement = pistaInput.current!;
        const error: HTMLParagraphElement = pistaError.current!;

        if (pista.length > 60) {
            input.className += " bad-input";
            error.innerHTML = t('hint_input_error_max_characters');
        } else {
            input.className = "wide-input";
            error.innerHTML = t('no_error');
            return true;
        }
    }

    const showError = (input: HTMLInputElement, error: HTMLParagraphElement, className: string, text: string) => {
        input.className = className;
        error.innerHTML = text;
    }

    const showInput = (ref: React.RefObject<HTMLInputElement>, show: boolean) => {
        const input: HTMLInputElement = ref.current!;

        if (show)
            input.type = "text";
        else
            input.type = "password";
        return;
    }

    const strengthCalculator = (password: string) => {
        setStrongPassword(calculateStrength(password));
    };

    return (
        <div className="login">
            <div className="login-content">
                <div className='content'>
                    <Title />
                    <div className="column">
                        <label>{t('user_label')}</label>
                        <input ref={userInput} className='wide-input' placeholder={t('user_input_placeholder')!} value={username} onChange={e => setUsername(e.target.value)} />
                        <p ref={userError} className='error-text'>&nbsp;</p>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>{t('password_label')}</label>
                            <div className="pass-wrapper">
                                <input ref={passwordInput} type='password' placeholder={t('password_input_placeholder')!} value={password} onChange={e => { setPassword(e.target.value); strengthCalculator(e.target.value) }} />
                                <i onClick={e => { setShowPassword(!showPassword); showInput(passwordInput, !showPassword); e.currentTarget.blur() }}>{showPassword ? eyeSlash : eye}</i>
                                <div className="password-checker">
                                    <progress ref={progressBar} className={`pass-checker-bar strength-${strongPassword}`}
                                        value={strongPassword}
                                        max="3" />
                                </div>
                            </div>
                            <p ref={passwordError} className='error-text'>&nbsp;</p>
                        </div>
                        <div className="column">
                            <label>{t('password_repeat_label')}</label>
                            <div className="pass-wrapper">
                                <input ref={passwordRepeatInput} type='password' placeholder={t('password_repeat_input_placeholder')!} value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                                <i onClick={e => { setShowRepeat(!showRepeat); showInput(passwordRepeatInput, !showRepeat); e.currentTarget.blur() }}>{showRepeat ? eyeSlash : eye}</i>
                            </div>
                            <p ref={passwordRepeatError} className='error-text'>&nbsp;</p>
                        </div>
                    </div>
                    <p>{t('hint_paragraph')}</p>
                    <div className="column">
                        <label>{t('hint_label')}</label>
                        <input ref={pistaInput} className='wide-input' placeholder={t('hint_input_placeholder')!} value={pista} onChange={handlePista} />
                        <div className="row">
                            <p ref={pistaError} className='error-text'>&nbsp;</p>
                            <label ref={pistaCounter} className='number-letters'>0/60</label>
                        </div>
                    </div>
                    <p ref={reqError} className='error-text'>&nbsp;</p>
                </div>
                <Footer prevNumber={1} nextNumber={3} activateNext={Context.policyChecked} submitFunction={handleSubmit} showSpinner={showSpinner} />
            </div>
        </div>
    )
}
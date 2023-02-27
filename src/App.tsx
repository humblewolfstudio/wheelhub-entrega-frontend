import React, { useState, createContext } from 'react';
import './App.scss';
import Header from './components/Header/Header.tsx';
import Introdution from './components/Introduction/Introduction.tsx';
import { CurrentPageContext } from './types/types';
import Login from './components/Login/Login.tsx';
import Feedback from './components/Feedback/Feedback.tsx';
const i18n = require('i18next');
const { initReactI18next } = require('react-i18next');
import { translation_resources } from './translations/translations.tsx';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export const CurrentContext = createContext<CurrentPageContext | null>(null);

//const language = navigator.language.slice(-2).toLowerCase() || "en";

const DETECTION_OPTIONS = {
    order: ['navigator']
};

i18n
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        detection: DETECTION_OPTIONS,
        resources: translation_resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

function App() {
    const [current, setCurrent] = useState(1);
    const [policyChecked, setPolicyChecked] = useState(false);

    return (
        <div className="app">
            <main className="app-content">
                <CurrentContext.Provider value={{ current, setCurrent, policyChecked, setPolicyChecked }}>
                    <Header></Header>
                    {current == 1 && <Introdution />}
                    {current == 2 && <Login />}
                    {current == 3 && <Feedback />}
                </CurrentContext.Provider>
            </main>
        </div>
    )
}
export default App;
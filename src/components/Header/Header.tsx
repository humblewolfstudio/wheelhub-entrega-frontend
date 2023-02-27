import React, { useContext, useEffect } from "react";
import { CurrentContext } from "../../App.tsx";
import { CurrentPageContext } from "../../types/types";

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faCheck } = require('@fortawesome/free-solid-svg-icons');

import './Header.scss'

const check = <FontAwesomeIcon icon={faCheck} />

export default function Header() {
    const Context: CurrentPageContext = useContext(CurrentContext)
    const titles = [
        { name: 1 },
        { name: 2 },
        { name: 3 }
    ]

    useEffect(() => {
        moveArrow();
    })

    const moveArrow = () => {
        switch (Context.current) {
            case 1:
                document.getElementById('wrapper')!.style.justifyContent = "flex-start";
                break;
            case 2:
                document.getElementById('wrapper')!.style.justifyContent = "center";
                break;
            case 3:
                document.getElementById('wrapper')!.style.justifyContent = "flex-end";
                break;
            default:
                document.getElementById('wrapper')!.style.justifyContent = "flex-start";
                break;
        }
    }

    return (
        <div className="header">
            <div className="header-content">
                <div className="number-wrapper">
                    {titles.map(function (title, i) {
                        return <>
                            <h4 key={title.name} className={`${title.name == Context.current ? 'current' : ''} ${title.name < Context.current ? 'verde-te-quiero-verde' : ''}`}>{title.name < Context.current ? check : title.name}</h4>
                            {title.name != 3 ? <hr key={'hr-' + title.name} className={`${Context.current > title.name ? 'green' : ''}`}></hr> : null}
                        </>
                    })}
                </div>
                <div id="wrapper" className="triangle-wrapper">
                    <div className="triangle"></div>
                </div>
            </div>
        </div>
    )
}
import { SetStateAction } from "react"

export interface CurrentPageContext {
    current: number,
    setCurrent: (value: SetStateAction<number>) => void,
    policyChecked: boolean,
    setPolicyChecked: (value: SetStateAction<boolean>) => void
}
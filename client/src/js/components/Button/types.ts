import * as React from "react";
import CSS from 'csstype';

export interface ButtonType {
    dataCy?: string,
    id?: string,
    size?: string,
    type?: string,
    children: React.ReactNode,
    style?: CSS.Properties,
    className?: string,
    disabled?: boolean,
    active?: boolean
    onClick?: () => void
    htmlType?: 'button' | 'submit' | 'reset' | undefined,
    dataTag?: string
}

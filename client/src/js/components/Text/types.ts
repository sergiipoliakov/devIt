import * as React from 'react';

export interface TextProps {
    dataCy?: string,
    id?: string,
    tag?: string
    weight?: string,
    size?: string,
    color?: string,
    transform?: string,
    lineHeight?: string,
    className?: string,
    children: React.ReactNode,
    dataTag?: string,
    title?: string,
}

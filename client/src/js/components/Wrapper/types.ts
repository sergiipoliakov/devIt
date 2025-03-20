import * as React from 'react';

export interface WrapperType {
    children: React.ReactNode;
    className?: string;
    dataCy?: string;
    onClick?: (e?: any) => void;
}

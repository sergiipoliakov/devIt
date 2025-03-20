import * as React from 'react';

export interface ModalTypes {
    children: React.ReactNode;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

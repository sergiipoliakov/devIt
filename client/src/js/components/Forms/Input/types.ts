import { ReactNode } from 'react';

export interface InputProps {
    id?: string;
    dataCy?: string;
    name?: string;
    disabled?: boolean;
    value?: string | number | null;
    label?: string;
    type?: string;
    sufix?: string | ReactNode;
    autocomplete?: string;
    allowClear?: boolean;
    icon?: {
        icon?: string,
        size?: string,
        color?: string,
        dataCy?: string,
        classNames?: {
            wrapper?: string,
            icon?: string
        }
        onClickIconHandler?: () => void
    };
    meta?: {
        error?: string,
        touched?: boolean,
        warning?: string,
    };
    placeholder?: string;
    classNames?: {
        wrapper?: string;
        label?: string;
        field?: string;
    };
    prefix?: ReactNode
    onChange?: (field: string, value: any) => void,
    onBlur?: (value: string) => void,
}

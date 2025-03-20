import React from 'react';
import { ButtonType } from './types';
import buttonStyle from './button.module.sass';

const Button = (props: ButtonType): JSX.Element => {
    const {
        dataCy,
        id,
        type = 'primary',
        htmlType = 'button',
        children,
        className = '',
        disabled,
        active = false,
        onClick = () => null,
        style,
        dataTag = ''
    } = props;

    return (
        <button
            id={id}
            data-cy={dataCy}
            style={style}
            className={`${buttonStyle.button} ${buttonStyle[`button--${type}`]} ${active ? buttonStyle[`button--${type}-active`] || '' : ''} ${className || ''} fl fl--align-c fl--justify-c`}
            type={htmlType}
            onClick={onClick}
            disabled={disabled}
            data-tag={dataTag}
        >
            {children}
        </button>
    );
};

export default Button;

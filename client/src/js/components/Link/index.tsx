import React from 'react';
import { Link } from 'react-router-dom';
import { LinkTypes } from './types';
import styles from './link.module.sass';

const LinkComponent = (props: LinkTypes): JSX.Element => {
    const {
        target,
        dataCy,
        className = '',
        children,
        to = '',
        active,
        type = 'primary',
        tag = '',
        href = '/',
        state,
        onClick,
        dataTag = ''
    } = props;

    const classList = [
        className,
        styles.link,
        styles[`link--${type}`],
        'cursor--pointer'
    ].join(' ');

    const onHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!onClick) return;
        onClick(e);
    };
    switch (tag) {
        case 'span':
            return (
                <span
                    role="button"
                    tabIndex={0}
                    data-cy={dataCy}
                    onClick={onHandleClick}
                    className={`${classList} ${
                        active ? `${styles[`link--${type}--active`]}` : ''
                    }`}
                    data-tag={dataTag}
                >
                    {children}
                </span>
            );
        case 'a':
            return (
                <a
                    href={href}
                    data-cy={dataCy}
                    target={target}
                    className={`${classList} ${
                        active ? `${styles[`link--${type}--active`]}` : ''
                    }`}
                    data-tag={dataTag}
                >
                    {children}
                </a>
            );
        default:
            return (
                <Link
                    data-cy={dataCy}
                    onClick={onHandleClick}
                    to={{
                        pathname: `${process.env.BASE_UI_PATH}${to}/`
                    }}
                    state={state}
                    className={`${classList} ${
                        active ? `${styles[`link--${type}--active`]}` : ''
                    }`}
                    data-tag={dataTag}
                >
                    {children}
                </Link>
            );
    }
};

export default LinkComponent;

import React from 'react';
import { ModalTypes } from './types';
import Wrapper from '../Wrapper';
import styles from './modal.module.sass';

const ModalComponent = (props: ModalTypes): JSX.Element => {
    const {
        children,
        active,
        setActive,
        className = ''
    } = props;

    return (
        <div
            data-cy="modal"
            role="presentation"
            tabIndex={-1}
            className={`${styles.modal} ${active ? styles['modal--active'] : ''} fl fl--align-c fl--justify-c`}
            onClick={() => setActive(false)}
        >
            <span 
                data-cy="modal-close"
                role="button"
                tabIndex={0}
                className={styles['modal__button-close']} 
                onClick={() => setActive(false)}
            >
                X
            </span>
            <Wrapper
                className={`${styles.modal__content} ${active ? styles['modal__content--active'] : ''} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Wrapper>
        </div>
    );
};

export default ModalComponent;

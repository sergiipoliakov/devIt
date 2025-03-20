import React from 'react';
import { LabelType } from './types';
import labelStyles from './labels.module.sass';

const LabelComponent = (props: LabelType): JSX.Element => {
    const {
        label,
        className = '',
        htmlFor
    } = props;
    const classList = [labelStyles.label, className].join(' ');
    
    return (
        <label htmlFor={htmlFor} className={classList}>
            {label}
        </label>
    );
};

export default LabelComponent;

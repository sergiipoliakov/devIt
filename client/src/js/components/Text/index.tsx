import React from 'react';
import { TextProps } from './types';

const TextComponent = (props: TextProps): JSX.Element => {
    const {
        tag = 'p',
        dataCy,
        id,
        weight = '500',
        size = 'default',
        color = 'main',
        transform = 'none',
        className,
        children,
        dataTag = '',
        title = ''
    } = props;

    const getSize = () => {
        const classes = [];
        switch (size) {
            case 'small':
                classes.push('text--small');
                break;
            case 'default':
                classes.push('text--default');
                break;
            case 'x-default':
                classes.push('text--x-default');
                break;
            case 'medial':
                classes.push('text--medial');
                break;
            case 'middle':
                classes.push('text--middle');
                break;
            case 'medium':
                classes.push('text--medium');
                break;
            case 'x-medium':
                classes.push('text--x-medium'); 
                break;
            case 'y-medium':
                classes.push('text--y-medium');
                break;
            case 'big':
                classes.push('text--big');
                break;
            case 'x-big':
                classes.push('text--x-big');
                break;
            case 'y-big':
                classes.push('text--y-big');
                    break;
            case 'xy-big':
                classes.push('text--xy-big');
                break;
            case 'huge':
                classes.push('text--huge');
                break;
            case 'largest':
                classes.push('text--largest');
                break;
            default:
                break;
        }
        return classes;
    };
    const getWeight = () => {
        const classes = [];
        switch (weight) {
            case '100':
                classes.push('font--100');
                break;
            case '200':
                classes.push('font--200');
                break;
            case '300':
                classes.push('font--300');
                break;
            case '400':
                classes.push('font--400');
                break;
            case '500':
                classes.push('font--500');
                break;
            case '600':
                classes.push('font--600');
                break;
            case '700':
                classes.push('font--700');
                break;
            case '800':
                classes.push('font--800');
                break;
            default:
                break;
        }
        return classes;
    };

    const getColors = () => {
        const classes = [];
        switch (color) {
            case 'main':
                classes.push('color--main');
                break;
            case 'extra':
                classes.push('color--extra');
                break;
            case 'disabled':
                classes.push('color--disabled');
                break;
            case 'default':
                classes.push('color--default');
                break;
            case 'primary':
                classes.push('color--primary');
                break;
            case 'secondary':
                classes.push('color--secondary');
                break;
            case 'tertiary':
                classes.push('color--tertiary');
                break;
            case 'error':
                classes.push('color--error');
                break;
            case 'success':
                classes.push('color--success');
                break;
            case 'fourth':
                classes.push('color--fourth');
                break;
            case 'dark-grey':
                classes.push('color--dark-grey');
                break;
            default:
                classes.push(color);
                break;
        }
        return classes;
    };
    const getTextTransform = () => {
        const classes = [];
        switch (transform) {
            case 'uppercase':
                classes.push('font--uppercase');
                break;
            case 'lowercase':
                classes.push('font--lowercase');
                break;
            case 'capitalize':
                classes.push('font--capitalize');
                break;
            case 'break-line':
                classes.push('font--break-line');
                break;
            default:
                break;
        }
        return classes;
    };

    const setDefaultTextClasses = () => {
        return [
            ...getSize(),
            ...getWeight(),
            ...getColors(),
            ...getTextTransform(),
            className
        ].join(' ');
    };

    return React.createElement(
        tag,
        { 
            className: setDefaultTextClasses(), 
            'data-cy': dataCy, 
            'data-tag': dataTag, 
            'id': id,
            'title': title
        },
        children
    );
};

export default TextComponent;

import React from 'react';
import Input from 'antd/lib/input';
import Label from '../Label';
// import Icons from '../../Icons';
import Text from '../../Text';
import { InputProps } from './types';
import inputStyles from './index.module.sass';
import './input.sass';

const InputComponent = (props: InputProps): JSX.Element => {
    const {
        id,
        dataCy,
        value,
        name,
        label,
        meta,
        disabled,
        sufix,
        autocomplete = 'off',
        type,
        prefix,
        allowClear,
        // icon: {
        //     icon,
        //     size: iconSize = '16',
        //     classNames: {
        //         wrapper: iconWrapperClassName = '',
        //         icon: iconClassName = ''
        //     } = {},
        //     color: iconColor = 'default',
        //     onClickIconHandler,
        //     dataCy: iconDataCy
        // } = {},
        placeholder,
        classNames: {
            label: labelClass = '',
            wrapper: wrapperClass = '',
            field: fieldClass = ''
        } = {},
        onChange
    } = props;
    const htmlFor = `input--f${(~~(Math.random() * 1e8)).toString(16)}`;
    const { touched, error, warning } = meta || {};

    const classList = [fieldClass || '', inputStyles.input || '', ...(touched && (error || warning) ? [inputStyles['input--error']] : []), ...(sufix ? [inputStyles['input--sufix']] : [])].join(' ');

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(name as string, event?.currentTarget?.value);
    };

    const setError = () => {
        if (touched && (error || warning)) {
            return (
                <>
                    {touched && (error || warning) ? (
                        <div className={`${inputStyles.input__message} ${inputStyles['input__message--error']} fl overflow--hidden`}>
                            {/* <Icons
                                dataCy="error-icon"
                                icon="flat/warning"
                                size="16"
                                color="error"
                                classNames={{
                                    wrapper: 'margin--r-8'
                                }}
                            /> */}
                            <Text
                                size="small"
                                dataCy="input-error-text"
                                color="error"
                                weight="400"
                                className="text-overflow--ellipsis overflow--hidden font--no-wrap"
                            >
                                {(error || warning)}
                            </Text>
                        </div>
                    ) : null}
                </>
            );
        }
        return null;
    };

    return (
        <div className={`fl ${wrapperClass} fl--dir-col width--100 relative--core`}>
            {label ? (
                <Label
                    htmlFor={id || htmlFor}
                    label={label}
                    className={`${labelClass || ''}`}
                />
            ) : null}
            <div className="relative--core width--100">
                {/* {icon ? (
                    <Icons
                        dataCy={iconDataCy}
                        icon={icon}
                        size={iconSize}
                        color={iconColor}
                        classNames={{
                            wrapper: `${inputStyles.input__icon} ${iconWrapperClassName || ''}`,
                            ...(iconClassName ? { icon: iconClassName } : {})
                        }}
                        {...(onClickIconHandler ? { onClick: onClickIconHandler } : {})}
                    />
                ) : null} */}
                {sufix ? (
                    <Text className={`${inputStyles.input__sufix}`} color="default" weight="400" transform="uppercase">{sufix}</Text>
                ) : null}

                <Input
                    data-cy={`${dataCy}-input`}
                    id={id || htmlFor}
                    type={type}
                    name={name}
                    value={value as any}
                    autoComplete={autocomplete}
                    className={`${classList} width--100`}
                    onChange={onChangeValue}
                    disabled={disabled}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    {...(prefix ? { prefix } : {})}
                />
            </div>
            {setError()}
        </div>
    );
};

export default InputComponent;

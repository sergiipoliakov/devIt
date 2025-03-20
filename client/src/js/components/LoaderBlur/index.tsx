import React from 'react';

// Types
import { ILoaderBlurTypes } from './types';

// Styles
import './loader-blur.sass';

const LoaderBlur = (props: ILoaderBlurTypes): JSX.Element => {
    const { children, fetch, theme } = props;
    return (
        <>
            {fetch ? (
                <>
                    <div className="loader-blur">
                        <div className={`loader-blur__inner  ${theme ? `loader-blur__inner--${theme}` : ''}`} />
                    </div>
                    <div className="loader-blur__blur">{children}</div>
                </>
            ) : (
                children
            )}
        </>
    );
};

export default LoaderBlur;

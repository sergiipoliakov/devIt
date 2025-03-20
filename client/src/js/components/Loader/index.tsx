import React from 'react';
import './loader.sass';
import { ILoader } from './types';

const Loader = (props: ILoader): JSX.Element => {
    const { withBlur } = props;
    return (
        <div className={`loader ${withBlur ? 'loader--blur' : ''}`}>
  		    <div className="loader__inner" />	
        </div>
    );
};

export default Loader;

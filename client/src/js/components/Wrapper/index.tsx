import React from 'react';
import { WrapperType } from './types';
import styles from './wrapper.module.sass';

const Wrapper = (props: WrapperType): JSX.Element => {
    const { 
      children, 
      className,
      dataCy,
      onClick
    } = props;
    const classList = [className, styles.wrapper].join(' ');
  return (
    <div 
      data-cy={dataCy} 
      role="presentation"
      tabIndex={-1} 
      onClick={onClick} 
      className={`${classList}`}
    >
        {children}
    </div>
  );
};

export default Wrapper;

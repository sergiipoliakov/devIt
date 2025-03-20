import React, { useState } from 'react';

// Components
import SideBar from '../SideBar';
import { ILayoutProps } from './types';

// Styles
import styles from './layout.module.sass';

const Layout = (props: ILayoutProps): JSX.Element => {
    const {
        children,
        fullHeight = false
    } = props;
    const [openMenu, setOpenMenu] = useState(false);
    const openMenuHandleClick = () => {
        setOpenMenu((prev) => !prev);
    };

    return (
        <>
            <div className={`${styles.layout} fl height--100`}>
                <SideBar active={openMenu} menuHandleClick={openMenuHandleClick} />
                <div className={`${styles.layout__wrapper} scrollbar height--100 relative--core`}>
                    <div className={`${styles['layout__children-wrapper']} ${fullHeight ? styles['layout__children-wrapper--full-height'] : ''} fl--1`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;

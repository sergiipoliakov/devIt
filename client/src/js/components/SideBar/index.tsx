import React from 'react';

// Components
import {
    // Icons,
    Navigation
} from '@wicommon/components';

// Types
import { SideBarProps } from './types';

// Styles
import styles from './sideBar.module.sass';

const SideBarComponent = (props: SideBarProps): JSX.Element => {
    const { active = false, menuHandleClick } = props;
    return (
        <>
            {active ? <div className={styles['side-bar__mobile-backdrop']} onClick={menuHandleClick} role="button" tabIndex={0} /> : null}
            <div className={`${styles['side-bar']} ${active ? styles['side-bar--active'] : ''} ${Number(process.env.SHOW_BRAND) ? '' : styles['side-bar--mobile-no-logo']} padding--b-36 scrollbar scrollbar--invisible`}>
                <span
                    role="button"
                    tabIndex={-1}
                    data-cy="navigation-mobile-close"
                    onClick={menuHandleClick}
                    className={styles['side-bar__button-close']}
                >
                    {/* <Icons
                        icon="flat/close"
                        size="14"
                        classNames={{ icon: styles['side-bar__button-close-icon'] }}
                    /> */}
                </span>
                <Navigation dataCy="navigation" onNavClick={menuHandleClick} />
            </div>
        </>
    );
};

export default SideBarComponent;

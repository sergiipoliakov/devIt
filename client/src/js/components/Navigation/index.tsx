/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useLayoutEffect, useState } from 'react';
import {
  useLocation,
  NavLink
} from 'react-router-dom';

// Components
import {
  Link
} from '@wicommon/components';

// Types
import { Menu, NavigatiosTypes } from './types';

// Styles
import styles from './navigation.module.sass';

const Navigation = (props: NavigatiosTypes): JSX.Element => {
  const { pathname: path } = useLocation();
  const [active, setActive] = useState({} as any);
  const { className = '', dataCy, onNavClick = () => null } = props;

  const LINKS = [
    {
      label: 'users',
      icon: 'users',
      link: 'users',
      path: '/'
    },
    {
      label: 'products',
      icon: 'products',
      link: 'products',
      path: '/products/'
    },
    {
      label: 'orders',
      icon: 'orders',
      link: 'orders',
      path: '/orders/'
    }
  ] as Menu[];

  useLayoutEffect(() => {
    const prevPath = LINKS?.find((el) => path.includes(el.label as string))?.path;
    setActive({ ...active, [prevPath]: prevPath });
  }, []);

  return (
    <div data-cy={dataCy} className={`${styles.nav} width--100 fl fl--dir-col fl--justify-b fl--align-st`}>
      <div className="width--100">
        {LINKS?.map((link) => {
          return (
            <NavLink
              end
              data-cy={link?.label}
              key={link?.link}
              to={`/account${link?.path}`}
              onClick={onNavClick}
              className={({ isActive }) => (`${isActive ? styles['nav__item--active'] : ''} ${className} ${styles.nav__item} fl fl--align-c margin--b-8`)}
            >
              <div
                className={`${styles.nav__link} fl fl--align-c width--100`}
              >
                <span className={styles['nav__link-text']}>{link?.link}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className={styles.nav__item}>
        <Link type="secondary" dataCy="logout-btn" className={`${styles.nav__link} fl fl--align-c`} to="/logout">
          {/* <Icons
                        icon="flat/logout"
                        size="22"
                        classNames={{
                            wrapper: `${styles['nav__icon-wrapper']} margin--r-6 padding--8`,
                            icon: styles.nav__icon
                        }}
                    /> */}
          <span className={styles['nav__link-text']}>logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;

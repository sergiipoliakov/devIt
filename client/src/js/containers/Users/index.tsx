import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Components
import {
  LoaderBlur,
  Text
} from '@wicommon/components';

import * as actions from './actions/user.actions';

// Endpoints
import {
  GET_USERS
} from './endpoints';

import styles from './users.module.sass';

const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([] as []);
  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    onCompleted: ({ resolveUsers }) => {
      setUsers(resolveUsers);
    }
  });
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.users}>
      <LoaderBlur fetch={(loading)}>
        <ul className={`${styles.users__list} width--50 margin--l-auto margin--r-auto`}>
          {
            users?.map((el) => {
              const { 
                name, 
                email, 
                id, 
                balance 
              } = el;
              return (
                <li 
                  role="tab" 
                  tabIndex={0} 
                  key={id} 
                  className={styles.users__item} 
                  onClick={() => dispatch(actions.user({ userId: id, balance }))}
                >
                  <Link to="orders" className="padding--12 block--core height--100">
                    <Text>
                      name {name}
                    </Text>
                    <Text>
                      email {email}
                    </Text>
                    <Text>
                      balance {balance}
                    </Text>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </LoaderBlur>
    </div>
  );
};

export default Users;

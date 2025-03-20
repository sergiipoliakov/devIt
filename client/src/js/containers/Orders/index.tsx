import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
// Components
import {
  LoaderBlur,
  Text
} from '@wicommon/components';

// Endpoints
import {
  GET_ORDERS
} from './endpoints';

// types
import { IOrders } from './types';

// Stypes
import styles from './orders.module.sass';

const Users = () => {
  const {
    id: userId,
    balance: userBalance
  } = useSelector((state: RootStateOrAny) => state.user as any);
  const [orders, setOrders] = useState([] as IOrders[]);
  const [getOrders, { loading }] = useLazyQuery(GET_ORDERS, {
    onCompleted: ({ resolveOrders }) => {
      setOrders(resolveOrders);
    }
  });
  useEffect(() => {
    getOrders({
      variables: {
        userId
      }
    });
  }, []);
  return (
    <div className={styles.orders}>
      <LoaderBlur fetch={(loading)}>
        <>
          {
            userId ? (
              <div className="margin--b-24">
                <Text className="margin--b-12">
                  user {orders?.[0]?.userId?.name} have {orders?.length} orders
                </Text>
                <Text>
                  balance {userBalance}
                </Text>
              </div>
            ) : null
          }
        </>
        <>
          {
            !userId ? (
              <Link
                type="secondary"
                to="/account/"
                className={styles.orders__add}
              >
                choose user
              </Link>
            ) : (
              <Link
                type="secondary"
                to="/account/products/"
                className={styles.orders__add}
              >
                + make order
              </Link>
            )
          }
        </>
        <ul className={`${styles.orders__list} width--50 margin--l-auto margin--r-auto`}>
          {
            orders?.map((el) => {
              const {
                productId: {
                  name: productNmae
                },
                quantity,
                id,
                totalPrice
              } = el;
              return (
                <li key={id} className={`${styles.orders__item}`}>
                  <Text>
                    <span className="font--700">{productNmae}</span>
                  </Text>
                  <Text>
                    quantity <span className="font--700">{quantity}</span>
                  </Text>
                  <Text>
                    totalPrice <span className="font--700">{totalPrice}</span>
                  </Text>
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

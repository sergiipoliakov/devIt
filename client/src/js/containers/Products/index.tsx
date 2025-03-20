import React, { useEffect, useState } from 'react';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

// Components
import {
  LoaderBlur,
  Text,
  Modal,
  Button,
  Notification
} from '@wicommon/components';

// Endpoints
import {
  GET_PRODUCTS
} from './endpoints';
import { ADD_ORDER } from '../Orders/endpoints';

// Helpers
import { errorsStringify } from '../../helpers/error.hl';

// Constants 
import { NOTIFICATION_TYPES } from '../../common/constants/errors';

import styles from './product.module.sass';

const Products = () => {
  const navigate = useNavigate();
  const {
      id: userId
    } = useSelector((state: RootStateOrAny) => state.user as any);
  const [products, setProducts] = useState([] as []);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [getProducts, { loading }] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: ({ resolveProducts }) => {
      setProducts(resolveProducts);
    }
  });
  useEffect(() => {
    getProducts();
  }, []);
  const [addOrder] = useLazyQuery(ADD_ORDER, {
    onError: (e: ApolloError) => {
      const description = errorsStringify(e);
      Notification(NOTIFICATION_TYPES.ERROR)({
          message: 'error',
          description
      });
    },
    onCompleted: () => {
      setAddProductModalOpen(false);
      navigate('/account/orders');
    }
  });
  const onProductClick = (id: string) => {
    setAddProductModalOpen(true);
    setSelectedProduct(id);
  };

  const onAddOrderToUserClick = () => {
    addOrder({
      variables: {
        productId: selectedProduct,
        userId,
        quantity
      }
    });
  };

  return (
    <div className={styles.product}>
      {
        addProductModalOpen ? (
          <Modal className={`${styles.product__modal}`} active={addProductModalOpen} setActive={setAddProductModalOpen}>
            <div className="fl fl--align-c fl--gap-16 margin--b-16">
              <Button onClick={() => setQuantity((prevQuantity) => (prevQuantity === 0 ? prevQuantity : prevQuantity - 1))}>
                -
              </Button>
              <span>
                quantity {quantity}
              </span>
              <Button onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
                +
              </Button>
            </div>
            <Button className="margin--auto" disabled={quantity === 0} onClick={onAddOrderToUserClick}>
                Add to user
            </Button>
          </Modal>
        ) : null
      }
      <LoaderBlur fetch={(loading)}>
        <Link
          type="secondary"
          to="create"
          className={styles.product__add}
        >
          + Add product to stock
        </Link>
        <ul className={`${styles.product__list} width--50 margin--l-auto margin--r-auto`}>
          {
            products?.map((el) => {
              const {
                name,
                price,
                id,
                stock
              } = el;
              return (
                <li 
                  role="tab"
                  key={id} 
                  className={`${styles.product__item} ${!userId ? styles['product__item--disabled'] : ''} cursor--pointer`}
                  onClick={() => onProductClick(id)} 
                >
                  <Text>
                    <span className="font--700">{name}</span>
                  </Text>
                  <Text>
                    price <span className="font--700">{price}</span>
                  </Text>
                  <Text>
                    stock <span className="font--700">{stock}</span>
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

export default Products;

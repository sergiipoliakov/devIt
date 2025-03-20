import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ApolloError, useLazyQuery } from '@apollo/client';

// Components
import {
  Input,
  Button,
  Notification
} from '@wicommon/components';

// Endpoints
import {
  ADD_PRODUCT
} from './endpoints';

// Helpers
import { errorsStringify } from '../../helpers/error.hl';

// Constants 
import { NOTIFICATION_TYPES } from '../../common/constants/errors';

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct] = useLazyQuery(ADD_PRODUCT, {
    onError: (e: ApolloError) => {
      console.log('🚀 ~ index.add.tsx:25 ~ AddProduct ~ e:', e);
      const description = errorsStringify(e);
      Notification(NOTIFICATION_TYPES.ERROR)({
          message: 'errorHasOccurred',
          description
      });
    },
    onCompleted: () => {
      console.log('Success');
      navigate('/account/products');
    }
  });
  const schema = yup.object().shape({
    name: yup.string()
      .required(),
    price: yup.number().min(1)
      .required(),
    stock: yup.number().min(1)
      .required()
  });
  const handlerSubmit = async (values: any) => {
    await addProduct({ variables: { name: values?.name, price: +values?.price, stock: +values?.stock } });
  };
  const {
    handleSubmit,
    setFieldValue,
    values: {
      name,
      price,
      stock
    },
    errors,
    touched
  } = useFormik({
    initialValues: {
      name: '',
      price: 0,
      stock: 0
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: handlerSubmit
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          classNames={{
            wrapper: 'margin--b-22'
          }}
          name="name"
          label="Product name"
          value={name}
          onChange={setFieldValue}
          meta={{
            error: errors.name as any,
            touched: touched.name as any
          }}
        />
        <Input
          classNames={{
            wrapper: 'margin--b-22'
          }}
          name="price"
          label="Product price"
          value={price}
          onChange={setFieldValue}
          meta={{
            error: errors.price as any,
            touched: touched.price as any
          }}
        />
        <Input
          classNames={{
            wrapper: 'margin--b-22'
          }}
          name="stock"
          label="In stock"
          value={stock}
          onChange={setFieldValue}
          meta={{
            error: errors.stock as any,
            touched: touched.stock as any
          }}
        />
        <Button
          htmlType="submit"
          className="margin--center"
        >
          Add product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;

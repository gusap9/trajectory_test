import { useState } from 'react';
import './styles.css';
import { useAppDispatch } from 'src/store/use-app';
import { Formik, Form, Field } from 'formik';
import { deleteItem, updateItem } from 'src/store/slices/itemSlice';
import { ICar } from 'src/ts/interfaces/item-interfaces';
import { Button } from 'src/shared/button/Button';

interface Props {
  item: ICar;
}

export const Item = ({ item }: Props) => {
  const [isDetailed, setIsDetailed] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <div>
      {!isEdit && (
        <div className='item'>
          <Button className='close' onClick={() => dispatch(deleteItem(item))}>
            &#x2715;
          </Button>
          <div className='title'>{item.name}</div>
          <div className='info'>Модель: {item.model}</div>
          <div className='info'>Год выпуска: {item.year}</div>
          <div className='info'>Цена: {item.price}</div>
          {!isDetailed && (
            <Button
              position='right'
              variant='link'
              onClick={() => setIsDetailed(true)}
            >
              Подробнее
            </Button>
          )}
          {isDetailed && (
            <>
              <div className='info'>Цвет: {item.color}</div>
              <div className='info_buttons'>
                <Button onClick={() => setIsEdit(true)}>Изменить</Button>
                <Button
                  position='right'
                  variant='link'
                  onClick={() => setIsDetailed(false)}
                >
                  Скрыть
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {isEdit && (
        <div className='item'>
          <Formik
            initialValues={{
              mark: item.name,
              model: item.model,
              price: item.price,
            }}
            onSubmit={(values) => {
              dispatch(
                updateItem({
                  id: item.id,
                  name: values.mark,
                  model: values.model,
                  price: values.price,
                })
              );
              setIsEdit(false);
            }}
          >
            <Form>
              <Field name='mark' className='info' />
              <Field name='model' className='info' />
              <Field name='price' className='info' />
              <div className='info'>Цвет: {item.color}</div>
              <div className='info'>Год выпуска: {item.year}</div>
              <div className='info_buttons'>
                <button onClick={() => setIsEdit(false)}>Отменить</button>
                <button type='submit'>Сохранить</button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

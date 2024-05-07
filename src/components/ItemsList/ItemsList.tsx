import './styles.css';
import { Item } from '../Item/Item';
import { ICar } from 'src/ts/interfaces/item-interfaces';
import { Button } from 'src/shared/button/Button';

interface Props {
  items: ICar[];
}

export const ItemsList = ({ items }: Props) => {
  return (
    <div className='items_list'>
      <div className='sort__box'>
        Сортировка
        <div>
          <Button variant='sort' sortType='age'>Год выпуска</Button>
          <Button variant='sort' sortType='price'>Цена</Button>
        </div>
      </div>
      <div className='items_box'>
        {items.map((el) => {
          return <Item key={el.id} item={el} />;
        })}
      </div>
    </div>
  );
};

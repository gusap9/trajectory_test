import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './styles.css';
import { useAppDispatch } from 'src/store/use-app';
import {
  sortItemsByAgeFromBottom,
  sortItemsByAgeFromTop,
  sortItemsByPriceFromBottom,
  sortItemsByPriceFromTop,
} from 'src/store/slices/itemSlice';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'link' | 'sort';
  width?: 'auto' | 'max';
  position?: 'center' | 'right';
  sortType?: 'price' | 'age';
  children: ReactNode;
}

export const Button = ({
  type,
  sortType,
  disabled = false,
  variant = 'primary',
  width = 'auto',
  children,
  position,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();
  const handleActiveChange = (el: HTMLButtonElement) => {
    if (el.children[0]) el = el.children[0];
    if (el) {
      el.classList.add('sort_icon_active');
      el.classList.toggle('sort_icon_toggle');
      if (sortType === 'price') {
        el.className.includes('sort_icon_toggle')
          ? dispatch(sortItemsByPriceFromBottom())
          : dispatch(sortItemsByPriceFromTop());
      }
      if (sortType === 'age') {
        el.className.includes('sort_icon_toggle')
          ? dispatch(sortItemsByAgeFromBottom())
          : dispatch(sortItemsByAgeFromTop());
      }
    }
  };
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={`button ${position} ${variant}`}
      onClick={(event) => {
        if (variant === 'sort')
          handleActiveChange(event.target as HTMLButtonElement);
      }}
      {...props}
    >
      {children}
      {variant === 'sort' && <div className='sort_icon'></div>}
    </button>
  );
};

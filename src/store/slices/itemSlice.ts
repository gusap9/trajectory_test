import { createSlice } from '@reduxjs/toolkit';
import { ICar } from 'src/ts/interfaces/item-interfaces';

const initialState: ICar[] = [];

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, action) {
      return (state = action.payload);
    },
    updateItem(state, action) {
      return state.map((item: ICar) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
            model: action.payload.model,
            price: action.payload.price,
          };
        }
        return item;
      });
    },
    deleteItem(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    sortItemsByPriceFromTop(state) {
      return state.sort((a, b) => a.price - b.price);
    },
    sortItemsByPriceFromBottom(state) {
      return state.sort((a, b) => b.price - a.price);
    },
    sortItemsByAgeFromTop(state) {
      return state.sort((a, b) => a.year - b.year);
    },
    sortItemsByAgeFromBottom(state) {
      return state.sort((a, b) => b.year - a.year);
    },
  },
});

export const {
  setItems,
  deleteItem,
  updateItem,
  sortItemsByPriceFromTop,
  sortItemsByPriceFromBottom,
  sortItemsByAgeFromTop,
  sortItemsByAgeFromBottom
} = itemSlice.actions;
export default itemSlice.reducer;

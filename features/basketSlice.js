import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Assuming action.payload is an item to add to the basket
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // Assuming action.payload is an index or identifier of the item to remove
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        Alert.alert(
          `Cant remove item with product id ${action.payload.id} as its not in the basket!`
        );
      }
      state.items = newBasket;
    },
    emptyBasket: (state) => {
      state.items = []; // Reset items array to empty
    },
  },
});

export const { addToBasket, removeFromBasket, emptyBasket } =
  basketSlice.actions;

// Selectors
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemswithId = createSelector(
  [selectBasketItems, (_, id) => id],
  (items, id) => items.filter((item) => item.id === id)
);

export const selectBasketTotal = createSelector([selectBasketItems], (items) =>
  items.reduce((total, item) => total + parseFloat(item.price), 0)
);

export default basketSlice.reducer;

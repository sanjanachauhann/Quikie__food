// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   restaurant: {
//     id: null,
//     imgUrl: null,
//     title: null,
//     rating: null,
//     genre: null,
//     address: null,
//     short_description: null,
//     dishes: null,
//     latitude: null,
//     longitude: null,
//     refrenceID: null,
//   },
// };

// const restaurantSlice = createSlice({
//   name: "restaurant",
//   initialState,
//   reducers: {
//     setRestaurant: (state, action) => {
//       state.restaurant = action.payload;
//     },
//     resetRestaurant: (state, action) => {
//       state.restaurant = "";
//     },
//   },
// });

// export const { setRestaurant, resetRestaurant } = restaurantSlice.actions;
// export const selectRestaurant = (state) => state.restaurant.restaurant;
// export default restaurantSlice.reducer;

import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    latitude: null,
    longitude: null,
    refrenceID: null,
  },
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    resetRestaurant: (state, action) => {
      state.restaurant = initialState.restaurant; // Reset restaurant state to initial state
    },
  },
});

export const { setRestaurant, resetRestaurant } = restaurantSlice.actions;

// Selectors
export const selectRestaurantState = (state) => state.restaurant;

export const selectRestaurant = createSelector(
  [selectRestaurantState],
  (restaurantState) => restaurantState.restaurant
);

export default restaurantSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // actions to modify the global store
    addToBasket: (state, action) => {

      // keep whatever is in the basket, but also
      // add the action
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      
      // search if the index of that item exists and matches with 
      // the payload 
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      // making a copy from the basket
      let newBasket = [...state.items];

      if(index >= 0){

        // remove that element from the basket
        newBasket.splice(index, 1);
      }
      else{
        console.warn(
          `Product cannot be removed ${action.payload.id} it's not in the basket`
        )
      }

      // replace the existing basket with the new one
      state.items = newBasket;
    },
    cleanBasket: (state) => {
      state.items = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, cleanBasket } = basketSlice.actions

// select the state of my slice basket
export const selectBasketItems = state => state.basket.items;

export const selectBasketItemsWithId = (state, id) => 
  state.basket.items.filter((item) => item.id === id);

// bring me the total price of the items selected on the basket
// reduce the entire array of items in just the total price  
export const selectBasketTotal = (state) => 
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer
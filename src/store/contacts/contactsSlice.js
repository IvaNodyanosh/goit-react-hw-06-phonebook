import { createSlice } from '@reduxjs/toolkit';

import { contactsInitialState } from './contactsInitialState';

const contactsSlice = createSlice({
  name: 'contacts',

  initialState: contactsInitialState,

  reducers: {
    addContact(state, action) {
      return [...state, action.payload];
    },
    removeContact(state, action) {
      return state.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

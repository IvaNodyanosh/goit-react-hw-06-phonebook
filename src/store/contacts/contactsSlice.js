import { createSlice } from '@reduxjs/toolkit';

import { contactsInitialState } from './contactsInitialState';
import { nanoid } from 'nanoid';


const contactsSlice = createSlice({
    name: "contacts",

    initialState: contactsInitialState,

    reducers: {
        addContact(state, action) {

            return (
                [...state,
                    { id: nanoid(), name: action.payload.name, number: action.payload.number },
                ]
            )
        },
        removeContact(state, action) {
            return state.filter(({id}) => id !== action.payload)
        },
    },
})

export const {addContact, removeContact} = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer
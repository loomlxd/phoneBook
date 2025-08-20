import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  getAllContacts,
  deleteOneContact,
  addOneContact,
  editOneContact,
} from './contacts-actions';

const entities = createReducer([], builder => {
  builder
    .addCase(getAllContacts.fulfilled, (_, { payload }) => payload)
    .addCase(deleteOneContact.fulfilled, (state, { payload }) =>
      state.filter(contact => contact.id !== payload.id),
    )
    .addCase(addOneContact.fulfilled, (state, { payload }) => [
      ...state,
      payload,
    ])
    .addCase(editOneContact.fulfilled, (state, { payload }) =>
      state.map(contact => (contact.id === payload.id ? payload : contact)),
    );
});

const isLoading = createReducer(false, builder => {
  builder
    .addCase(getAllContacts.pending, () => true)
    .addCase(getAllContacts.rejected, () => false)
    .addCase(getAllContacts.fulfilled, () => false)
    .addCase(deleteOneContact.pending, () => true)
    .addCase(deleteOneContact.rejected, () => false)
    .addCase(deleteOneContact.fulfilled, () => false)
    .addCase(addOneContact.pending, () => true)
    .addCase(addOneContact.rejected, () => false)
    .addCase(addOneContact.fulfilled, () => false)
    .addCase(editOneContact.pending, () => true)
    .addCase(editOneContact.rejected, () => false)
    .addCase(editOneContact.fulfilled, () => false);
});

const error = createReducer(null, builder => {
  builder
    .addCase(getAllContacts.rejected, (_, { payload }) => payload)
    .addCase(getAllContacts.pending, () => null)
    .addCase(deleteOneContact.rejected, (_, { payload }) => payload)
    .addCase(deleteOneContact.pending, () => null)
    .addCase(addOneContact.rejected, (_, { payload }) => payload)
    .addCase(addOneContact.pending, () => null)
    .addCase(editOneContact.rejected, (_, { payload }) => payload)
    .addCase(editOneContact.pending, () => null);
});

export default combineReducers({ entities, isLoading, error });

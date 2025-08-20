import { createAsyncThunk } from '@reduxjs/toolkit';
import DbApi from '../../fetch-db-apis';

export const getAllContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await DbApi.fetchAllContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addOneContact = createAsyncThunk(
  'contacts/addOneContact',
  async (data, { rejectWithValue }) => {
    try {
      const contact = await DbApi.createContact({
        name: data.name,
        phone: data.phone,
      });
      return contact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteOneContact = createAsyncThunk(
  'contacts/deleteOneContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const data = await DbApi.deleteContact(contactId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editOneContact = createAsyncThunk(
  'contacts/editOneContact',
  async (params, { rejectWithValue }) => {
    try {
      const editedContact = await DbApi.editContact(params.id, params.data);
      return editedContact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

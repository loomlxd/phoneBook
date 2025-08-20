import { createSelector } from '@reduxjs/toolkit';

export const getFilteredContacts = createSelector(
  [state => state.filter.value, state => state.contacts.entities],
  (filter, contacts) =>
    contacts.filter(contact =>
      contact.name?.toLowerCase().includes(filter?.toLowerCase()),
    ),
);

export const getContacts = state => state.contacts.entities;

export const getLoadingStatus = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

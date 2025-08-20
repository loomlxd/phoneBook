import { supabase } from './supabaseClient';

async function registerUser(email, name, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    throw new Error(`${error.message}`);
  }

  return {
    user: data.user,
    token: data.session?.access_token || null,
    name: data.user?.user_metadata?.name || null,
  };
}

async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`${error.message}`);
  }

  return {
    user: data.user,
    name: data.user?.user_metadata?.name || null,
  };
}

async function fetchAllContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`${error.message}`);
  }

  return data;
}

async function createContact(newContact) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([newContact])
    .select();

  if (error) {
    throw new Error(`${error.message}`);
  }

  return data[0];
}

async function deleteContact(contactId) {
  const { data, error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', contactId)
    .select();

  if (error) {
    throw new Error(`${error.message}`);
  }

  return data[0];
}

async function editContact(contactId, updates) {
  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', contactId)
    .select();

  if (error) {
    throw new Error(`${error.message}`);
  }

  return data[0];
}

async function logOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`${error.message}`);
  }

  return true;
}

async function refreshCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`${error.message}`);
  }
  return user;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  registerUser,
  fetchAllContacts,
  loginUser,
  createContact,
  deleteContact,
  editContact,
  logOutUser,
  refreshCurrentUser,
};

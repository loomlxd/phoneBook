import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_CONTACTS_URL;
const supabaseKey = process.env.REACT_APP_CONTACTS_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase com as credenciais fornecidas
const SUPABASE_URL = 'https://jhzqjsgizhczgnwdmlpi.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoenFqc2dpemhjemdud2RtbHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDQ5ODgsImV4cCI6MjA4MDE4MDk4OH0.2eOChTBkl5PtsMtLI9IaarWncqFy2YUY84yExO9FwY8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
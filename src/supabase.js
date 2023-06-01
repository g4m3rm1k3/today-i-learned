import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxasevsmwxwkvohajnhl.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXNldnNtd3h3a3ZvaGFqbmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUzNjEyNDgsImV4cCI6MjAwMDkzNzI0OH0.gk9CFyG_z5LEL8fb4MOImg4aTCYTo6nVIqSS34OdiNs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

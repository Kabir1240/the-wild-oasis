
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rulqggqoyivkedszvwzq.supabase.co'

let supabaseKey = import.meta.env.VITE_SUPABASE_KEY
if (!supabaseKey) {
  supabaseKey = ""
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

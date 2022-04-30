import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://lfyfrajlafymxjbbddlw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODMwMDEyMywiZXhwIjoxOTUzODc2MTIzfQ.s90IsUxW7EzVzsL7WPXZD9anwQMYEboO-NRskD09j4s',
)

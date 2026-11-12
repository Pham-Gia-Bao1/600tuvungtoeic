import { createClient } from "@/utils/supabase/client";

export const getSupabaseClient = () => createClient();

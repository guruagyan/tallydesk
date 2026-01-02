import { createClient } from '@supabase/supabase-js';

export default async function handler(request) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response("Missing environment variables", { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    let slug = "site"; 
    try {
      const body = await request.json().catch(() => ({}));
      if (body.slug) slug = body.slug;
    } catch (err) {}

    const { data, error } = await supabase.rpc("increment_page_view", {
      slug_input: slug
    });

    if (error) {
      console.error(error);
      return new Response("Database error", { status: 500 });
    }

    return new Response(JSON.stringify({ slug, count: data }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Function error", { status: 500 });
  }
};




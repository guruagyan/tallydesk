import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const subscription = JSON.parse(event.body);

  await supabase.from("push_subscriptions").insert({
    subscription
  });

  return {
    statusCode: 200,
    body: "Saved"
  };
}
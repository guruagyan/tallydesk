import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'; // optional if using .env

// Configure Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Configure VAPID
webpush.setVapidDetails(
  "mailto:deepak.tiwari@tallysolutions.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function sendNotifications() {
  const { data } = await supabase
    .from("push_subscriptions")
    .select("subscription");

  for (const row of data) {
    try {
      await webpush.sendNotification(
        row.subscription,
        JSON.stringify({
          title: "New Update",
          body: "Release 7.0 data sheet is now available"
        })
      );
      console.log("Notification sent to:", row.id);
    } catch (err) {
      console.error("Failed to send to:", row.id, err.message);
    }
  }
}

sendNotifications();

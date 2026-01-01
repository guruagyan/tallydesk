import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("visitor-counter");

  let count = await store.get("count");
  count = count ? Number(count) + 1 : 1;

  await store.set("count", count);

  return new Response(
    JSON.stringify({ count }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
};
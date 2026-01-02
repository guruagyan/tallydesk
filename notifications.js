const publicVapidKey = "BOwhgOvXXaI86Q3YYJug0Z_5PBctz3fags3ql97I46ulXa8dZn0rmzMcF58_Z9qJ0z6dahL6KEFwf0KEZiwFcFc";

document.getElementById("notifyBtn").onclick = async () => {
  if (!("serviceWorker" in navigator)) {
    alert("Notifications not supported");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.register("/sw.js");

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch("/.netlify/functions/save-subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" }
  });

  alert("Notifications enabled!");
};

// helper
function urlBase64ToUint8Array(base64) {
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

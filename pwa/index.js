async function askPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    registerServiceWorker();
  }
}

async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  let subscription = await registration.pushManager.getSubscription();
  // L'utilisateur n'est pas déjà abonné, on l'abonne au notification push
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: await getPublicKey(),
    });
  }

  await saveSubscription(subscription);
}

async function getPublicKey() {
  const key = await fetch("http://localhost:3000/webpush/key", {
    headers: {
      Accept: "application/json",
    },
  }).then((r) => r.text());
  return key;
}

/**
 * @param {PushSubscription} subscription
 * @returns {Promise<void>}
 */
async function saveSubscription(subscription) {
  await fetch("http://localhost:3000/webpush/subscribe", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: subscription.toJSON(),
  });
}

askPermission();

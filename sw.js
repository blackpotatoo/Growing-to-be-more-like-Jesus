self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = {
        body: event.data.text()
      };
    }
  }

  const title = data.title || "Growing to Be More Like Jesus 🤎";

  const options = {
    body: data.body || "You have a new message 👥",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    data: {
      url: data.url || "./"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "./";

  event.waitUntil(
    clients.openWindow(url)
  );
});
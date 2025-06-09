self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};

  const title = data?.title || "Notification";
  const options = {
    body: data?.body || "",
    icon: "/fire.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

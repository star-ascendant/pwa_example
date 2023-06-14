document.getElementById("push").addEventListener("click", () => {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        setTimeout(function(){new Notification("Уведомление")}, 6000)
      }
    });
  });
  
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

let deferredPrompt;
self.addEventListener('beforeinstallprompt', (e) => {
        console.log("Hi")
        deferredPrompt = e;
    });

const install = self.document.getElementById('install');
    install.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    });
export default function silentRefresh() {
  return new Promise((resolve, reject) => {
    const silentRefreshUrl = `${window.location.origin}/silent-refresh.html`;
    const iframe = document.createElement("iframe");
    iframe.hidden = true;
    iframe.title = "Refreshing token...";
    iframe.src = `https://service.bitbrew.com/auth/refresh?redirect_uri=${silentRefreshUrl}`;
    iframe.onmessage = event => {
      if (
        event.origin === window.location.origin &&
        event.data === "REFRESH_REDIRECT_COMPLETE"
      ) {
        const params = new URLSearchParams(event.source.location.search);
        const token = params.get("access_token");
        window.removeEventListener("message", iframe.onmessage);
        document.body.removeChild(iframe);
        resolve(token);
      }
    };
    iframe.onload = event => {
      try {
        // eslint-disable-next-line no-unused-expressions
        event.currentTarget.contentWindow.href;
      } catch {
        window.removeEventListener("message", iframe.onmessage);
        document.body.removeChild(iframe);
        reject();
      }
    };
    window.addEventListener("message", iframe.onmessage);
    document.body.appendChild(iframe);
  });
}

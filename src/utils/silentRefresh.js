export default function silentRefresh() {
  return new Promise((resolve, reject) => {
    let timeoutId = null;
    const iframe = document.createElement("iframe");
    const silentRefreshUrl = `${window.location.origin}/silent-refresh.html`;

    function cleanup() {
      window.clearTimeout(timeoutId);
      window.removeEventListener("message", iframe.onmessage);
      document.body.removeChild(iframe);
    }

    iframe.onload = event => {
      try {
        if (
          (
            event.currentTarget.contentWindow ||
            event.currentTarget.contentDocument
          ).location.href === "about:blank"
        ) {
          throw new Error();
        }
      } catch {
        cleanup();
        reject();
      }
    };

    iframe.onmessage = event => {
      if (
        event.origin === window.location.origin &&
        event.data === "REFRESH_REDIRECT_COMPLETE"
      ) {
        const params = new URLSearchParams(event.source.location.search);
        const token = params.get("access_token");
        cleanup();
        resolve(token);
      }
    };

    iframe.hidden = true;
    iframe.src = `https://service.bitbrew.com/auth/refresh?redirect_uri=${silentRefreshUrl}`;
    iframe.title = "Refreshing token...";
    window.addEventListener("message", iframe.onmessage);
    document.body.appendChild(iframe);

    if (!module.hot) {
      timeoutId = window.setTimeout(() => {
        cleanup();
        reject();
      }, 2000);
    }
  });
}

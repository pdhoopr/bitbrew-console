import { refreshUrl } from '../../../config/env';

export default class TokenService {
  constructor(http) {
    this.http = http;
  }

  refresh = () =>
    new Promise((resolve, reject) => {
      const redirectUrl = `${window.location.origin}/refresh-token.html`;
      const iframe = document.createElement('iframe');
      iframe.hidden = true;
      iframe.title = 'Refreshing token...';
      iframe.src = `${refreshUrl}?redirect_uri=${redirectUrl}`;
      iframe.onmessage = event => {
        if (
          event.origin === window.location.origin &&
          event.data === 'REFRESH_TOKEN'
        ) {
          const params = new URLSearchParams(event.source.location.search);
          const token = params.get('access_token');
          window.removeEventListener('message', iframe.onmessage);
          document.body.removeChild(iframe);
          resolve(token);
        }
      };
      iframe.onload = event => {
        try {
          // eslint-disable-next-line no-unused-expressions
          event.currentTarget.contentWindow.href;
        } catch {
          window.removeEventListener('message', iframe.onmessage);
          document.body.removeChild(iframe);
          reject();
        }
      };
      window.addEventListener('message', iframe.onmessage);
      document.body.appendChild(iframe);
    });
}

class HttpHelper {
  static fetch(url, method, headers, body) {
    let options = Object.assign({ method });
    if (headers) {
      options = Object.assign(options, { headers });
    }
    if (body && method !== 'GET') {
      options = Object.assign(options, { body });
    }

    const request = new Request(url, options);

    return fetch(request)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const error = new Error(`${response.statusText}(${response.status}), URL: ${response.url}`);
        return Promise.reject(error);
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default HttpHelper;

import HttpHelper from './HttpHelper';

class CompilerApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static getTask(lang) {
    return HttpHelper.fetch(
      
      //`${process.env.API_URL}/api/file/${lang}`,
      `http://localhost:8000/api/file/${lang}`,

      'GET',
      this.requestHeaders(),
      null,
    );
  }

  static run(answer) {
    return HttpHelper.fetch(
      //`${process.env.API_URL}/api/run/`,
      `http://localhost:8000/api/run/`,
      'POST',
      this.requestHeaders(),
      JSON.stringify(answer),
    );
  }
}

export default CompilerApi;

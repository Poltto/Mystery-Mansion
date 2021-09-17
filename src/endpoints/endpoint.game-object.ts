declare const window;


export class GameObject {
  private static urlPrefix = window.PRODUCTION ? 'test' : 'http://localhost:8050';


  public static get(params?) {
    let options = {
      method: 'GET'
    };

    let urlSuffix = params?.id ? '/' + params.id : '';
    return fetch(this.urlPrefix + '/api/gameObject' + urlSuffix, options);
  }

  public static create(gameObject) {
    let options = {
      method: 'POST',
      body: JSON.stringify(gameObject),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    return fetch(this.urlPrefix + '/api/gameObject', options);
  }

  constructor() {

  }
}

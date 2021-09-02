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

  constructor() {

  }
}

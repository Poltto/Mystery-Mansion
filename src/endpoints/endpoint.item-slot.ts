declare const window;


export class ItemSlot {
  private static urlPrefix = window.PRODUCTION ? 'test' : 'http://localhost:8050';


  public static get(params?) {
    let options = {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      },
    };

    let urlSuffix = params?.id ? '/' + params.id : '';
    return fetch(this.urlPrefix + '/api/itemSlot' + urlSuffix, options);
  }

  constructor() {

  }
}

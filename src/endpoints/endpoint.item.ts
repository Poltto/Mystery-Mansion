declare const window;


export class Item {
  private static urlPrefix = window.PRODUCTION ? 'test' : 'http://localhost:8050';


  public static get(params?) {
    let options = {
      method: 'GET'
    };

    let urlSuffix = params?.id ? '/' + params.id : '';
    return fetch(this.urlPrefix + '/api/item' + urlSuffix, options);
  }

  public static pickUpItem({...itemId}) {
    let options = {
      method: 'POST',
      body: JSON.stringify({itemId})
    };

    return fetch(this.urlPrefix + '/api/item/pickUpItem', options);
  }

  constructor() {

  }
}

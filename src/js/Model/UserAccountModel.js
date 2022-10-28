export class UserAccountModel {
  #name;
  #days;
  #localStrage;

  constructor(name, days) {
    this.#name = name;
    this.days = days;
    this.#localStrage = this.getLocalStrage(name);
  }

  /**
   * ゲーム開始時にユーザーデータをJSONにデータを保存する
   * @param  {string} name
   */
  static setLocalstorage(userName) {
    // オブジェクトを文字列に変換して格納
    localStorage.setItem(userName, JSON.stringify(this.localStorageData));

    // ローカルストレージに保存した文字列のオブジェクトをオブジェクトに変換
    const myLocalStrage = localStorage.getItem(userName);
    console.log(JSON.parse(myLocalStrage));
  }

  /**
   * ローカルストレージからデータを取得する
   * @param  {string} name
   */
  static getLocalStrage(name) {
    let myLocalStrage = localStorage.getItem(name);
    if (myLocalStrage === null) {
      // グローバルオブジェクトにユーザー名をセット
      const entity = new DataEntity(name);
      console.log('ローカルストレージにデータがありませんでした。新しくデータをセットします。');
    }

    console.log('ローカルストレージにデータが存在していました。');
    myLocalStrage = JSON.parse(myLocalStrage);
    entity.item = Object.assign(entity.item, myLocalStrage);
  }
}

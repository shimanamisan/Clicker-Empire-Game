export class AppController {
  /**
   * 要素を表示するクラスを付与するメソッド
   * @param  {object} element
   */
  static displayBlock(element) {
    element.classList.remove('d-none');
    element.classList.add('d-block');
  }

  /**
   * 要素を非表示にするクラスを付与するメソッド
   * @param  {object} element
   */
  static displayNone(elem) {
    elem.classList.remove('d-block');
    elem.classList.add('d-none');
  }

  /**
   * configに getElementById で取得した要素を追加する
   * @param {*} configName
   * @param {*} element
   */
  static addConfigElement(configName, element) {
    // config[configName] = element.querySelectorAll(`#${configName}`)[0];
    console.log(configName, element);
  }

  static newGame(none, block) {
    alert('click!');

    AppController.displayBlock(block);
    AppController.displayNone(none);
  }

  static login() {
    alert('click!');
  }
}

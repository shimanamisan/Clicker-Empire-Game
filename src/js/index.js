import '../image/burger.webp';
import '../scss/style.scss';
import { dataEntity } from './Entity/DataEntity';

/**
 * elementオブジェクトの情報を格納する
 */
const config = {
  mainPage: document.getElementById('mainPage'),
  loginPage: document.getElementById('loginPage'),
  empirePage: document.getElementById('empirePage'),
};

//#region ユーザーアカウントクラス
class UserAccount {
  constructor(name, days) {
    this.name = name;
    this.days = days;
  }
}
//#endregion

//#region ログインページ描画
class LoginPage {
  static loginPage = config.loginPage;
  static empirePage = config.empirePage;

  /**
   * HTML要素を描画
   */
  static createPage() {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center col-8 offset-2 vh-100">
      <div id="initialForm" class="bg-white col-md-8 col-lg-6 col-sm-12 text-center p-4">
        <h2 class="pb-3">Clicker Empire Game</h2>
        <form id="bank-form" class="form" onsubmit="event.preventDefault();">
          <div class="form-group">
            <input type="text" name="userName" class="form-control" placeholder="Your Name" value="" required />
          </div>
          <div class="d-flex justify-content-between">
            <div class="col-6 pl-0">
              <button type="submit" class="btn btn-primary col-12" id="newGame">New</button>
            </div>
            <div class="col-6 pr-0">
              <button type="submit" class="btn btn-primary col-12" id="Login">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>`;

    this.addEvent(container, 'newGame', () => AppController.newGame(LoginPage.loginPage, LoginPage.empirePage));
    this.addEvent(container, 'Login', () => AppController.login(LoginPage.loginPage, LoginPage.empirePage));
    this.loginPage.append(container);
  }

  /**
   * イベントリスナーを追加する
   * @param {object} element - HTML要素
   * @param {string} id - イベントリスナーを設定するID要素の文字列
   * @param {function} func - イベントリスナーに追加する処理
   */
  static addEvent(element, id, func) {
    const selector = element.querySelectorAll(`#${id}`)[0];
    selector.addEventListener('click', func);
  }
}
//#endregion

//#region  購入ページ描画
class EmpirePage {
  static empirePage = config.empirePage;

  /**
   * HTML要素を描画
   */
  static createPage() {
    const container = document.createElement('div');

    const addClassElement = this.addClass(container);

    // configオブジェクト参照する要素を追加
    this.addConfigElement(addClassElement);

    this.empirePage.append(addClassElement);
  }

  /**
   * HTML要素に必要なクラスを追加
   * @param {object} element - HTML要素
   * @returns {object}
   */
  static addClass(element) {
    // trueを指定すると子ノードまで取得する
    // ここでは子ノードは作成されていないのでfalseとする
    const innerParent = element.cloneNode(false);
    const innerChildeurgerArea = element.cloneNode(false);
    const innerChildeItemAlea = element.cloneNode(false);

    // コンテナとなる要素にクラスを追加
    element.classList.add('d-flex', 'justify-content-center', 'p-md-5', 'pb-5', 'vh-100');
    innerParent.classList.add('bg-navy', 'p-2', 'd-flex', 'col-md-10', 'col-md-11', 'col-lg-10');
    innerChildeurgerArea.classList.add('col-4', 'p-3', 'bg-dark');
    innerChildeItemAlea.classList.add('col-8', 'text-center');

    // id属性を追加
    innerParent.setAttribute('id', 'itemSelect');
    // 左サイドバーのハンバーガーをクリックするエリア
    innerChildeurgerArea.setAttribute('id', 'burgerArea');
    // 右サイドバーのアイテムを選択するエリア
    innerChildeItemAlea.setAttribute('id', 'itemAreaContainer');

    // innerParentの子要素として追加
    innerParent.append(innerChildeurgerArea);
    innerParent.append(innerChildeItemAlea);
    // containerの子要素として追加
    element.append(innerParent);

    return element;
  }

  /**
   * 新しいID要素をオブジェクトに追加する
   * @param {object} element - HTML要素
   */
  static addConfigElement(element) {
    config[`itemSelect`] = element.querySelectorAll(`#itemSelect`)[0];
    config[`burgerArea`] = element.querySelectorAll(`#burgerArea`)[0];
    config[`itemAreaContainer`] = element.querySelectorAll(`#itemAreaContainer`)[0];
  }
}
//#endregion

//#region 左のハンバーガーエリア要素を描画
class LeftBurgerAreaElement {
  /**
   * HTML要素を描画
   */
  static createPage() {
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="bg-navy text-white text-center" id="burgerInfo">
      <p class="p-2" id="burgerCountertPoint">${dataEntity.clickCount} Burgers</p>
      <p class="p-2" id="burgerRate">one click ￥${dataEntity.incomePerClick}</p>
    </div>
    <div class="p-2 pt-5 d-flex justify-content-center hover-pointer" id="burgerClick">
      <img class="click-animation" src="./images/burger.webp" alt="" srcset="" />
    </div>
  `;

    // configオブジェクト参照する要素を追加
    this.addConfigElement(container);

    this.addEvent();

    config.burgerArea.append(container);
  }

  /**
   * 新しいID要素をオブジェクトに追加する
   * @param {object} element - HTML要素
   */
  static addConfigElement(element) {
    config[`burgerClick`] = element.querySelectorAll(`#burgerClick`)[0];
  }

  /**
   * イベントリスナーを追加する
   */
  static addEvent() {
    config.burgerClick.addEventListener('click', () => {
      dataEntity.clickCount++;
      dataEntity.money += dataEntity.incomePerClick;
      config.burgerClick.classList.add('click-animation');
      this.burgerAreaUpdate(dataEntity);
      this.burgerIncomeUpdate(dataEntity);
      config.burgerClick.classList.remove('click-animation');
    });
  }

  /**
   * クリックしたときにハンバーガーエリアの情報を更新する
   * @param {object} userData - ユーザーオブジェクト
   */
  static burgerAreaUpdate(userData) {
    const burgerCountertPoint = document.getElementById('burgerCountertPoint');
    burgerCountertPoint.innerHTML = `${userData.clickCount} Burgers`;
  }

  /**
   * ハンバーガーを焼いたことにより得た所得を更新する
   * @param {object} userData - ユーザーオブジェクト
   */
  static burgerIncomeUpdate(userData) {
    const burgerIncomeArea = document.getElementById('burgerIncome');
    burgerIncomeArea.innerHTML = `￥${userData.money}`;
  }

  /**
   * アイテム購入ページから戻るときに再描画させる処理
   */
  static update() {
    config.burgerArea.innerHTML = '';
    this.createPage();
  }
}
//#endregion

//#region 右の上部ユーザーデータエリアを描画
class UserDataAreaElement {
  /**
   * HTML要素を描画
   */
  static createPage(userData) {
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="bg-navy text-white pd-2 mb-2" id="userDataArea">
      <div class="d-flex justify-content-between">
        <div class="col-6 p-2 border-dark">${dataEntity.name}</div>
        <div class="col-6 p-2 border-dark" id=userAge>${dataEntity.age} years old</div>
      </div>
      <div class="d-flex">
        <div class="col-6 p-2 border-dark" id="countDate">${userData.days} days</div>
        <div class="col-6 p-2 border-dark" id="burgerIncome">￥${dataEntity.money}</div>
      </div>
    </div>
    `;

    this.addConfigElement(container);

    config.itemAreaContainer.append(container);
  }

  /**
   * 新しいID要素をオブジェクトに追加する
   * @param {object} element - HTML要素
   */
  static addConfigElement(element) {
    config[`userDataArea`] = element.querySelectorAll(`#userDataArea`)[0];
    config[`userAge`] = element.querySelectorAll(`#userAge`)[0];
    config[`countDate`] = element.querySelectorAll(`#countDate`)[0];
    config[`burgerIncome`] = element.querySelectorAll(`#burgerIncome`)[0];
  }
}
//#endregion

//#region アイテム選択エリアの描画
class ItemSelectAreaElement {
  /**
   * HTML要素を描画
   * @param {object} userData - ユーザーオブジェクト
   */
  static createPage(userData) {
    const container = document.createElement('div');
    const innerElement = container.cloneNode(false);
    container.classList.add('bg-dark', 'over-flow', 'over-flow-height', 'p-2');
    innerElement.setAttribute('id', 'itemArea');

    let htmlString = '';
    // 投資先のアイテムデータ
    const investmentItems = dataEntity.items;

    // データが存在していれば、そのデータを元に購入アイテム要素を生成する
    if (investmentItems !== null) {
      for (let i = 0; i < investmentItems.length; i++) {
        htmlString += `
        <div class="bg-navy text-white d-flex m-1 align-items-center p-3 item-card js-item-card">
          <div class="col-3"><img src="${investmentItems[i].url}" alt="" srcset="" /></div>
          <div class="col-9">
            <div class="d-flex justify-content-between">
              <h4>${investmentItems[i].name}</h4>
              <h4>${investmentItems[i].currentAmount}</h4>
              </div>
              <div class="d-flex justify-content-between">
              <p>￥${investmentItems[i].price}</p>
              <p class="text-success">￥${investmentItems[i].perMoney} / ${i === 0 ? 'click' : 'sec'} </p>
            </div>
          </div>
        </div>
        `;
      }
    }

    innerElement.innerHTML = htmlString;
    container.append(innerElement);

    // configオブジェクト参照する要素を追加
    this.addConfigElement(container);

    const itemCrads = container.querySelectorAll('.js-item-card');

    // イベントリスナーを登録
    for (let i = 0; i < itemCrads.length; i++) {
      itemCrads[i].addEventListener('click', () => {
        ItemPaymentPageAreaElement.createPage(investmentItems[i], i, userData);
      });
    }
    config.itemAreaContainer.append(container);
  }

  /**
   * 新しいID要素をオブジェクトに追加する
   * @param {object} element - HTML要素
   */
  static addConfigElement(element) {
    config[`itemArea`] = element.querySelectorAll(`#itemArea`)[0];
  }
}
//#endregion

//#region アイテム購入ページを描画
class ItemPaymentPageAreaElement {
  /**
   * HTML要素を描画
   * @param {object} dataEntity - データエンティティ
   * @param {int} index - データエンティティ内の購入アイテムを反復処理したときのインデックス
   * @param {object} userData - ユーザーオブジェクト
   */
  static createPage(dataEntity, index, userData) {
    const container = document.createElement('div');
    const maxAmount = dataEntity.maxAmount === null ? '∞' : dataEntity.maxAmount;

    config.itemArea.innerHTML = '';
    container.innerHTML = `
    <div id="itemPurchase" class="over-flow-height">
      <div class="bg-dark item-card-height p-2">
        <div class="bg-navy p-2 m-1">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-white text-left">
              <h4>${dataEntity.name}</h4>
              <p class="mb-2 js-max-purchases">Max purchases: ${maxAmount}</p>
              <p class="mb-2 js-price">Price: ￥${dataEntity.price}</p>
              <p class="mb-2 js-get">Get ￥${dataEntity.perMoney} / ${index === 0 ? 'click' : 'sec'}</p>
            </div>
            <div class="col-5 p-2"><img src="${dataEntity.url}" alt="" srcset="" /></div>
          </div>
          <div class="text-white text-left">
            <p class="mb-2">How many would you like to buy?</p>
          </div>
          <div>
            <input class="form-control col-12" type="number" placeholder="0" min="0" id="purchaseCount"/>
          </div>
          <div class="text-white text-right">
            <p class="mb-3 js-purchases-total">total: ￥0</p>
          </div>
          <div class="d-flex justify-content-between pb-3">
            <button id="back" class="btn btn-outline-primary col-5 btn-background-color">GO Back</button>
            <button id="purchase" class="btn btn-primary col-5">Purchase</button>
          </div>
        </div>
      </div>
    </div>
    `;

    config.itemArea.append(container);

    // イベントリスナーを登録
    container.querySelectorAll('#back')[0].addEventListener('click', () => {
      this.backItemSelectPage(userData);
    });

    container.querySelectorAll('#purchase')[0].addEventListener('click', () => {
      this.purchaseItem(dataEntity.price, index, userData);
    });

    container.querySelectorAll('#purchaseCount')[0].addEventListener('change', (event) => {
      this.changingCountPurchaseItem(event, dataEntity.price);
    });
  }

  /**
   * アイテム購入ページに戻る処理
   * @param {object} userData - ユーザーオブジェクト
   */
  static backItemSelectPage(userData) {
    config.itemAreaContainer.innerHTML = '';
    UserDataAreaElement.createPage(userData);
    ItemSelectAreaElement.createPage(userData);
    GameSaveArea.createPage();
  }

  /**
   * 購入ボタンをクリックしたときの処理
   * @param {int} itemPrice - アイテムの金額
   * @param {int} index - 購入アイテムのインデックス
   * @param {object} userData - ユーザーオブジェクト
   */
  static purchaseItem(itemPrice, index, userData) {
    const inputBox = document.getElementById('purchaseCount');
    const maxAmount = dataEntity.items[index].maxAmount;
    if (inputBox.value === '' || parseInt(inputBox.value) === 0) return;

    const purchaseCount = parseInt(inputBox.value);
    const totalAmount = parseInt(itemPrice) * purchaseCount;

    if (totalAmount >= dataEntity.money) {
      alert('所持金が不足しているので購入できません。');
      return;
    }

    if (maxAmount !== null && purchaseCount > maxAmount) {
      alert('最大購入数をオーバーしています。');
      return;
    }

    // 所持金を減らす
    dataEntity.money -= totalAmount;

    // 購入アイテムの個数をカウントする
    dataEntity.items[index].currentAmount += purchaseCount;

    // 購入したアイテムがFlip machineだった場合
    if (index === 0) {
      // ハンバーガー売買時のレートを上げる
      dataEntity.incomePerClick += dataEntity.incomePerClick * purchaseCount;
    }

    // ETF Stockを購入した場合は、現在の価格より10%増額した値段にする
    if (dataEntity.items[index].name === 'ETF Stock') {
      dataEntity.items[index].price = Math.floor(dataEntity.items[index].price * 1.1);
    }

    // アイテム選択ページに戻る
    this.backItemSelectPage(userData);
    // ハンバーガーをクリックするエリアを更新
    LeftBurgerAreaElement.update();
  }

  /**
   * 購入する個数を選択するときに実行する処理
   * @param {object} event - changeイベント
   * @param {int} itemPrice - アイテムの金額
   */
  static changingCountPurchaseItem(event, itemPrice) {
    const purchaseTotal = document.querySelector('.js-purchases-total');
    purchaseTotal.innerHTML = `total: ￥${parseInt(event.target.value) * parseInt(itemPrice)}`;
  }
}
//#endregion

//#region ゲームセーブ操作エリアを描画
class GameSaveArea {
  /**
   * HTML要素を描画
   */
  static createPage() {
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="d-flex justify-content-end">
      <div class="p-2 icon-border mr-2 hover-pointer" id="reset">
        <i class="fas fa-undo fa-2x text-white"></i>
      </div>
      <div class="p-2 icon-border hover-pointer" id="save">
        <i class="fas fa-save fa-2x text-white"></i>
      </div>
    </div>`;

    container.querySelectorAll('#reset')[0].addEventListener('click', () => {
      this.reset();
    });

    container.querySelectorAll('#save')[0].addEventListener('click', () => {
      this.save();
    });

    config.itemAreaContainer.append(container);
  }

  /**
   * 現在の状態をリセットしてリロードする
   * @returns none
   */
  static reset() {
    if (window.confirm('現在の情報を消去します。よろしいですか？')) {
      localStorage.removeItem(dataEntity.name);
      location.reload();
      return;
    }
  }

  /**
   * 現在の状態をローカルストレージへ保存する
   * @returns none
   */
  static save() {
    if (window.confirm('現在の情報を保存します。よろしいですか？')) {
      // setItem(key, string)
      // key: 取得や削除のときに指定するキー
      // string: 実際に保存するデータ（オブジェクイトを保存する場合は String型 に変換する）
      localStorage.setItem(dataEntity.name, JSON.stringify(dataEntity));
      return;
    }
  }
}
//#endregion

class AppController {
  /**
   * ゲームを開始する
   * @param  {object} none
   * @param  {object} block
   */
  static newGame(none, block) {
    const form = document.getElementById('bank-form');
    const userName = form.querySelectorAll(`input[name="userName"]`)[0].value;

    if (userName === '') {
      alert('ユーザー名は入力必須です。');
      return;
    }

    dataEntity.name = userName;

    const userData = new UserAccount(userName, 0);

    this.displayBlock(block);
    this.displayNone(none);

    // メインページを描画
    EmpirePage.createPage();
    // ハンバーガーをクリックするエリアを描画
    LeftBurgerAreaElement.createPage();
    // ユーザーの所持金などのデータを表示するエリアを描画
    UserDataAreaElement.createPage(userData);
    // アイテムエリアを描画
    ItemSelectAreaElement.createPage(userData);
    // ゲームセーブやリセットボタンエリアを描画
    GameSaveArea.createPage();
    // 日にちをカウントする
    this.dateCounter(userData);
  }

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
   * ログイン処理
   * @returns none
   */
  static login() {
    const form = document.getElementById('bank-form');
    const userName = form.querySelectorAll(`input[name="userName"]`)[0].value;

    if (userName === '') {
      alert('ユーザー名は入力必須です。');
      return;
    }

    const myLocalStrage = localStorage.getItem(userName);

    // 取得してきたlocalStorageのデータが空だった場合は実行しない
    if (myLocalStrage === null) {
      alert('データが保存されていません。');
      return;
    }
    // データが存在していたときの処理
    // no-import-assign
    dataEntity = Object.assign(dataEntity, myLocalStrage);

    this.newGame(config.loginPage, config.empirePage);
  }

  /**
   * 1秒毎にデータを更新する
   * @param {int} days - ユーザーが保持している日数
   * @param {int} amountPerMoney - 購入しているアイテムより毎秒増える資産
   */
  static updateUserDateArea(days, amountPerMoney) {
    config.countDate.innerHTML = '';
    config.countDate.innerHTML = `${days} days`;
    config.burgerIncome.innerHTML = '';
    config.burgerIncome.innerHTML = `￥${amountPerMoney}`;
  }

  /**
   * 毎秒購入しているアイテムを計算して資金を追加する
   * @returns {int} 所持金を返却
   */
  static updateCurrentAmountCount() {
    let totalPerMoney = 0;

    for (let i = 0; i < dataEntity.items.length; i++) {
      if (i === 0) continue;
      if (dataEntity.items[i].currentAmount === 0) continue;

      if (dataEntity.items[i].type === 'investment') {
        totalPerMoney += Math.floor(dataEntity.items[i].price * (dataEntity.items[i].perMoney / 100));
      } else {
        totalPerMoney += dataEntity.items[i].perMoney;
      }
    }

    return (dataEntity.money += totalPerMoney);
  }

  /**
   * 日付をカウントするタイマー
   * @param {object} userData - ユーザーオブジェクト
   */
  static dateCounter(userData) {
    const oneYear = 365;

    setInterval(() => {
      userData.days++;
      this.updateUserDateArea(userData.days, this.updateCurrentAmountCount());
      if (userData.days > oneYear) {
        dataEntity.age++;
        this.updateUserDateArea(userData.days, this.updateCurrentAmountCount());
      }
    }, 1000);
  }
}

// トップページを描画する
LoginPage.createPage();

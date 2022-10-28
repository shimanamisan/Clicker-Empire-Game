import '../scss/style.scss';
// import { DataEntity } from './Modules/DataEntity';
//
// import { MainPage } from './View/MainPage';
import { LoginPage } from './View/LoginPage';
// import { EmpirePage } from './View/EmpirePage';

const config = {
  mainPage: document.getElementById('mainPage'),
  loginPage: document.getElementById('loginPage'),
  empirePage: document.getElementById('empirePage'),
};

// const mainView = new MainPage(document.getElementById('mainPage'));
const loginView = new LoginPage(config.mainPage, config.loginPage, config.empirePage);
// const empireView = new EmpirePage(document.getElementById('empirePage'));

loginView.createLoginPage();

class UserAccount {
  constructor(name, days) {
    this.name = name;
    this.days = days;
    this.getLocalStrage(name);
  }
  /**
   * ゲーム開始時にユーザーデータをJSONにデータを保存する
   * @param  {string} name
   */
  setLocalstorage(userName) {
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
  getLocalStrage(name) {
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

  /**
   * 日にちをカウントするメソッド
   * @param  {object} entity
   */
  dateCounter(entity) {
    const oneYear = 365;

    setInterval(() => {
      this.days++;
      View.updateUserDateArea(this.days, View.updateCurrentAmountCount());
      if (this.days > oneYear) {
        entity.age++;
        View.updateUserDateArea(this.days, View.updateCurrentAmountCount());
      }
    }, 1000);
  }
}

/******************************
 * 画面の描画や更新を行うクラス
 ******************************/
class View {
  // ログインページを描画
  static createLoginPage() {
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

    // ゲームボタン実行時のイベントを指定
    EventManager.newGameButtonAddEvent(container);
    EventManager.loginButtonAddEvent(container);

    config.loginPage.append(container);
  }

  // ゲームのメインページを描画
  static createEmpirePage() {
    // INFO: ここで作成されるid属性
    // itemSelect
    // burgerArea
    // itemAreaContainer

    const container = document.createElement('div');

    // trueを指定すると子ノードまで取得する
    // ここでは子ノードは作成されていないのでfalseとする
    const innerParent = container.cloneNode(false);
    const innerChildeurgerArea = container.cloneNode(false);
    const innerChildeItemAlea = container.cloneNode(false);

    // コンテナとなる要素にクラスを追加
    container.classList.add('d-flex', 'justify-content-center', 'p-md-5', 'pb-5', 'vh-100');
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
    container.append(innerParent);

    // config オブジェクトにid属性より取得したDOMを追加する
    AppController.addConfigElement('itemSelect', container);
    AppController.addConfigElement('burgerArea', container);
    AppController.addConfigElement('itemAreaContainer', container);

    config.empirePage.append(container);
  }

  // 左のサイドバーを描画
  static leftSidebarRendering() {
    // INFO: ここで作成されるid属性
    // burgerClick
    const container = document.createElement('div');

    container.innerHTML = `
      <div class="bg-navy text-white text-center" id="burgerInfo">
        <p class="p-2" id="burgerCountertPoint">${entity.clickCount} Burgers</p>
        <p class="p-2" id="burgerRate">one click ￥${entity.incomePerClick}</p>
      </div>
      <div class="p-2 pt-5 d-flex justify-content-center hover-pointer" id="burgerClick">
        <img class="click-animation" src="./image/burger.webp" alt="" srcset="" />
      </div>
    `;

    AppController.addConfigElement('burgerClick', container);

    EventManager.burgerCountUPEvent();

    config.burgerArea.append(container);
  }

  // 右の上部ユーザーデータエリアを描画
  static userDataAreaRendering(currentUser) {
    // INFO: ここで作成されるid属性
    // userDataArea
    // userAge
    // countDate
    // burgerIncome

    const container = document.createElement('div');

    container.innerHTML = `
      <div class="bg-navy text-white pd-2 mb-2" id="userDataArea">
        <div class="d-flex justify-content-between">
          <div class="col-6 p-2 border-dark">${entity.name}</div>
          <div class="col-6 p-2 border-dark" id=userAge>${entity.age} years old</div>
        </div>
        <div class="d-flex">
          <div class="col-6 p-2 border-dark" id="countDate">${currentUser.days} days</div>
          <div class="col-6 p-2 border-dark" id="burgerIncome">￥${entity.money}</div>
        </div>
      </div>
      `;

    AppController.addConfigElement('userDataArea', container);
    AppController.addConfigElement('userAge', container);
    AppController.addConfigElement('countDate', container);
    AppController.addConfigElement('burgerIncome', container);

    config.itemAreaContainer.append(container);
  }

  // 右のサイドバーのアイテム要素を描画
  static rightSidebarRendering(currentUser) {
    // INFO: ここで作成されるid属性
    // itemArea
    const container = document.createElement('div');
    const inner = container.cloneNode(false);
    container.classList.add('bg-dark', 'over-flow', 'over-flow-height', 'p-2');
    inner.setAttribute('id', 'itemArea');

    const items = entity.items;
    let htmlString = '';

    // データが存在していれば、そのデータを元にアイテムを生成する
    if (items !== null) {
      for (let i = 0; i < items.length; i++) {
        htmlString += `
        <div class="bg-navy text-white d-flex m-1 align-items-center p-3 item-card js-item-card">
          <div class="col-3"><img src="${items[i].url}" alt="" srcset="" /></div>
          <div class="col-9">
            <div class="d-flex justify-content-between">
              <h4>${items[i].name}</h4>
              <h4>${items[i].currentAmount}</h4>
              </div>
              <div class="d-flex justify-content-between">
              <p>￥${items[i].price}</p>
              <p class="text-success">￥${items[i].perMoney} / ${i === 0 ? 'click' : 'sec'} </p>
            </div>
          </div>
        </div>
        `;
      }
    }

    inner.innerHTML = htmlString;
    container.append(inner);

    AppController.addConfigElement('itemArea', container);

    const itemCrads = container.querySelectorAll('.js-item-card');
    for (let i = 0; i < itemCrads.length; i++) {
      itemCrads[i].addEventListener('click', () => {
        View.itemSelectPageRendering(items[i], i, currentUser);
      });
    }
    config.itemAreaContainer.append(container);
  }

  // 1秒毎に更新する領域
  static updateUserDateArea(days, amountPerMoney) {
    config.countDate.innerHTML = '';
    config.countDate.innerHTML = `${days} days`;
    config.burgerIncome.innerHTML = '';
    config.burgerIncome.innerHTML = `￥${amountPerMoney}`;
  }

  // 毎秒購入しているアイテムを計算して資金を追加する
  static updateCurrentAmountCount() {
    let totalPerMoney = 0;

    for (let i = 0; i < entity.items.length; i++) {
      if (i === 0) continue;
      if (entity.items[i].currentAmount === 0) continue;

      if (entity.items[i].type === 'investment') {
        totalPerMoney += Math.floor(entity.items[i].price * (entity.items[i].perMoney / 100));
      } else {
        totalPerMoney += entity.items[i].perMoney;
      }
    }

    return (entity.money += totalPerMoney);
  }

  // アイテム購入ページを描画
  static itemSelectPageRendering(item, index, currentUser) {
    const container = document.createElement('div');
    const maxAmount = item.maxAmount === null ? '∞' : item.maxAmount;

    config.itemArea.innerHTML = '';
    container.innerHTML = `
    <div id="itemPurchase" class="over-flow-height">
      <div class="bg-dark item-card-height p-2">
        <div class="bg-navy p-2 m-1">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-white text-left">
              <h4>${item.name}</h4>
              <p class="mb-2 js-max-purchases">Max purchases: ${maxAmount}</p>
              <p class="mb-2 js-price">Price: ￥${item.price}</p>
              <p class="mb-2 js-get">Get ￥${item.perMoney} / ${index === 0 ? 'click' : 'sec'}</p>
            </div>
            <div class="col-5 p-2"><img src="${item.url}" alt="" srcset="" /></div>
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

    container.querySelectorAll('#back')[0].addEventListener('click', () => {
      View.backItemSelectPage(currentUser);
    });

    container.querySelectorAll('#purchase')[0].addEventListener('click', () => {
      AppController.purchaseItem(item.price, index, currentUser);
    });

    container.querySelectorAll('#purchaseCount')[0].addEventListener('change', (event) => {
      AppController.changingCountPurchaseItem(event, item.price);
    });
  }

  // アイテム選択ページに戻るときの処理
  static backItemSelectPage(currentUser) {
    config.itemAreaContainer.innerHTML = '';
    View.userDataAreaRendering(currentUser);
    View.rightSidebarRendering(currentUser);
    View.gameSaveArea();
  }

  // ハンバーガーをクリックするエリアを更新する
  static updateLeftSidebar() {
    config.burgerArea.innerHTML = '';
    View.leftSidebarRendering();
  }

  // セーブ、リセットエリアを描画
  static gameSaveArea() {
    // INFO: ここで作成されるid属性
    // reset
    // save
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="d-flex justify-content-end mt-3">
      <div class="p-2 icon-border mr-2 hover-pointer" id="reset">
        <i class="fas fa-undo fa-2x text-white"></i>
      </div>
      <div class="p-2 icon-border hover-pointer" id="save">
        <i class="fas fa-save fa-2x text-white"></i>
      </div>
    </div>`;

    container.querySelectorAll('#reset')[0].addEventListener('click', () => {
      AppController.gameReset();
    });

    container.querySelectorAll('#save')[0].addEventListener('click', () => {
      AppController.gameSave();
    });

    config.itemAreaContainer.append(container);
  }
}

/**********************************
 * イベントを設定する処理を管理するクラス
 **********************************/
class EventManager {
  // ログインページ内の Newボタン にイベントを追加
  static newGameButtonAddEvent(container) {
    const newGameButton = container.querySelectorAll('#newGame')[0];
    // ログインボタンを押したときの処理
    newGameButton.addEventListener('click', () => {
      AppController.newGame(config.loginPage, config.empirePage);
    });
  }

  // ログインページ内の Loginボタン にイベントを追加
  static loginButtonAddEvent(container) {
    const loginButton = container.querySelectorAll('#Login')[0];
    // ログインボタンを押したときの処理
    loginButton.addEventListener('click', () => {
      AppController.login();
    });
  }

  // ハンバーガーがクリックされたときの動作
  static burgerCountUPEvent() {
    config.burgerClick.addEventListener('click', () => {
      entity.clickCount++;
      entity.money += entity.incomePerClick;
      config.burgerClick.classList.add('click-animation');
      AppController.burgerAreaUpdate(entity);
      AppController.burgerIncomeUpdate(entity);
      config.burgerClick.classList.remove('click-animation');
    });
  }
}

/********************************************
 * イベント時に実行する処理などをまとめたクラス
 ********************************************/
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

    entity.name = userName;

    const currentUser = new UserAccount(userName, 0);

    this.displayBlock(block);
    this.displayNone(none);

    // メインページを描画
    View.createEmpirePage();
    // ハンバーガーをクリックするエリアを描画
    View.leftSidebarRendering();
    // ユーザーの所持金などのデータを表示するエリアを描画
    View.userDataAreaRendering(currentUser);
    // アイテムエリアを描画
    View.rightSidebarRendering(currentUser);
    // ゲームセーブやリセットボタンエリアを描画
    View.gameSaveArea();
    // 日付をカウントするタイマーを実行
    currentUser.dateCounter();
  }

  // ゲームをロードする
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
    entity = Object.assign(entity, myLocalStrage);

    AppController.newGame(config.loginPage, config.empirePage);
  }

  // クリックしたときにハンバーガーエリアの情報を更新する
  static burgerAreaUpdate(userData) {
    const burgerCountertPoint = document.getElementById('burgerCountertPoint');
    burgerCountertPoint.innerHTML = `${userData.clickCount} Burgers`;
  }

  // ハンバーガーを焼いたことにより得た所得を更新する
  static burgerIncomeUpdate(userData) {
    const burgerIncomeArea = document.getElementById('burgerIncome');
    burgerIncomeArea.innerHTML = `￥${userData.money}`;
  }

  // 購入ボタンをクリックしたときの処理
  static purchaseItem(itemPrice, index, currentUser) {
    const inputBox = document.getElementById('purchaseCount');
    const maxAmount = entity.items[index].maxAmount;
    if (inputBox.value === '' || parseInt(inputBox.value) === 0) return;

    const purchaseCount = parseInt(inputBox.value);
    const totalAmount = parseInt(itemPrice) * purchaseCount;

    if (totalAmount >= entity.money) {
      alert('所持金が不足しているので購入できません。');
      return;
    }

    if (maxAmount !== null && purchaseCount > maxAmount) {
      alert('最大購入数をオーバーしています。');
      return;
    }

    // 所持金を減らす
    entity.money -= totalAmount;

    // 購入アイテムの個数をカウントする
    entity.items[index].currentAmount += purchaseCount;

    // 購入したアイテムがFlip machineだった場合
    if (index === 0) {
      // ハンバーガー売買時のレートを上げる
      entity.incomePerClick += entity.incomePerClick * purchaseCount;
    }

    // ETF Stockを購入した場合は、現在の価格より10%増額した値段にする
    if (entity.items[index].name === 'ETF Stock') {
      entity.items[index].price = Math.floor(entity.items[index].price * 1.1);
    }

    // アイテム選択ページに戻る
    View.backItemSelectPage(currentUser);
    // ハンバーガーをクリックするエリアを更新
    View.updateLeftSidebar();
  }

  // 購入する個数を選択するときに実行する処理（changeイベント）
  static changingCountPurchaseItem(event, itemPrice) {
    const purchaseTotal = document.querySelector('.js-purchases-total');
    purchaseTotal.innerHTML = `total: ￥${parseInt(event.target.value) * parseInt(itemPrice)}`;
  }

  // ゲームをリセットする
  static gameReset() {
    if (window.confirm('現在の情報を消去します。よろしいですか？')) {
      localStorage.removeItem(entity.name);
      location.reload();
      return;
    }
  }

  // 現在のゲームの状態をローカルストレージに保存する
  static gameSave() {
    if (window.confirm('現在の情報を保存します。よろしいですか？')) {
      // setItem(key, string)
      // key: 取得や削除のときに指定するキー
      // string: 実際に保存するデータ（オブジェクイトを保存する場合は String型 に変換する）
      localStorage.setItem(entity.name, JSON.stringify(entity));
      console.log('ローカルストレージに保存しました');
      return;
    }
  }
}

/**************
 * 初期化処理
 **************/
(function () {
  // トップページを描画
  View.createLoginPage();
})();

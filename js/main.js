const config = {
  mainPage: document.getElementById("mainPage"),
  loginPage: document.getElementById("loginPage"),
  initialForm: document.getElementById("initialForm"),
  empirePage: document.getElementById("empirePage"),
  loginButton: document.getElementById("Login"),
  itemArea: document.getElementById("itemArea"),
  itemPurchase: document.getElementById("itemPurchase"),
}



class UserAccount {

  data =
    {
      "age": "20",
      "name": name,
      "money": 50000,
      "clickCount": 0,
      "incomePerClick": 75,
      "incomePerSec": 0,
      "stock": 0,
      "items": [
        {
          "name": "Flip machine",
          "type": "ability",
          "currentAmount": 0,
          "maxAmount": 500,
          "perMoney": 25,
          "perRate": 0,
          "price": 15000,
          "url": "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
        },
        {
          "name": "ETF Stock",
          "type": "investment",
          "currentAmount": 0,
          "maxAmount": -1,
          "perMoney": 0,
          "perRate": 0.1,
          "price": 300000,
          "url": "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
        },
        {
          "name": "ETF Bonds",
          "type": "investment",
          "currentAmount": 0,
          "maxAmount": -1,
          "perMoney": 0,
          "perRate": 0.07,
          "price": 300000,
          "url": "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
        },
        {
          "name": "Lemonade Stand",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 1000,
          "perMoney": 30,
          "perRate": 0,
          "price": 30000,
          "url": "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"
        },
        {
          "name": "Ice Cream Truck",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 500,
          "perMoney": 120,
          "perRate": 0,
          "price": 100000,
          "url": "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"
        },
        {
          "name": "House",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 100,
          "perMoney": 32000,
          "perRate": 0,
          "price": 20000000,
          "url": "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"
        },
        {
          "name": "TownHouse",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 100,
          "perMoney": 64000,
          "perRate": 0,
          "price": 40000000,
          "url": "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"
        },
        {
          "name": "Mansion",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 20,
          "perMoney": 500000,
          "perRate": 0,
          "price": 250000000,
          "url": "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"
        },
        {
          "name": "Industrial Space",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 10,
          "perMoney": 2200000,
          "perRate": 0,
          "price": 1000000000,
          "url": "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"
        },
        {
          "name": "Hotel Skyscraper",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 5,
          "perMoney": 25000000,
          "perRate": 0,
          "price": 10000000000,
          "url": "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"
        },
        {
          "name": "Bullet-Speed Sky Railway",
          "type": "realState",
          "currentAmount": 0,
          "maxAmount": 1,
          "perMoney": 30000000000,
          "perRate": 0,
          "price": 10000000000000,
          "url": "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
        }
      ]
    }

  constructor(name) {
    this.data.name = name
  }

  /**
 * ゲーム開始時にユーザーデータをJSONにデータを保存する
 * @param  {string} name
 */
  setLocalstorage() {
    // オブジェクトを文字列に変換して格納
    localStorage.setItem("gameData", JSON.stringify(this.data))

    // ローカルストレージに保存した文字列のオブジェクトをオブジェクトに変換
    let myLocalStrage = localStorage.getItem("gameData")
    console.log(JSON.parse(myLocalStrage));
  }

  static getLocalStrage() {
    let myLocalStrage = localStorage.getItem("gameData")
    if (myLocalStrage === null) {
      return
    }

    myLocalStrage = JSON.parse(myLocalStrage)
    return myLocalStrage
  }
}

class View {
  // ログインページを描画
  static createLoginPage() {
    const container = document.createElement('div')
    container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center col-8 offset-2 vh-100">
      <div id="initialForm" class="bg-white col-md-8 col-lg-6 col-sm-12 text-center p-4">
        <h2 class="pb-3">Clicker Empire Game</h2>
        <form id="bank-form" class="form" onsubmit="initializeUserAccount(); event.preventDefault()">
          <div class="form-group">
            <input type="text" name="userName" class="form-control" placeholder="Your Name" value="User01" required />
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
    </div>`
    return container
  }

  // ログインページ内の Newボタン にイベントを追加
  static newGameButtonAddEvent() {
    const newGameBtn = document.getElementById("newGame")
    // ログインボタンを押したときの処理
    newGameBtn.addEventListener('click', () => {
      AppController.newGame(config.loginPage, config.empirePage)
    })
  }

  // ログインページ内の Loginボタン にイベントを追加
  static loginButtonAddEvent() {
    const loginBtn = document.getElementById("Login")
    // ログインボタンを押したときの処理
    loginBtn.addEventListener('click', () => {
      AppController.login()
    })
  }

  // ゲームのメインページを描画
  static createEmpirePage() {
    const container = document.createElement("div")

    // trueを指定すると子ノードまで取得する
    // ここでは子ノードは作成されていないのでfalseとする
    const innerParent = container.cloneNode(false)
    const innerChildeurgerArea = container.cloneNode(false)
    const innerChildeItemAlea = container.cloneNode(false)

    // コンテナとなる要素にクラスを追加
    container.classList.add("d-flex", "justify-content-center", "p-md-5", "pb-5", "vh-100")
    innerParent.classList.add("bg-navy", "p-2", "d-flex", "col-md-10", "col-md-11", "col-lg-10")
    innerChildeurgerArea.classList.add("col-4", "p-3", "bg-dark")
    innerChildeItemAlea.classList.add("col-8", "text-center")

    // id属性を追加
    innerParent.setAttribute("id", "itemSelect")
    // 左サイドバーのハンバーガーをクリックするエリア
    innerChildeurgerArea.setAttribute("id", "burgerArea")
    // 右サイドバーのアイテムを選択するエリア
    innerChildeItemAlea.setAttribute("id", "itemAreaContainer")

    // innerParentの子要素として追加
    innerParent.append(innerChildeurgerArea)
    innerParent.append(innerChildeItemAlea)
    // containerの子要素として追加
    container.append(innerParent)

    return container
  }

  // 左のサイドバーを描画
  static leftSidebarRendering() {
    const burgerArea = document.getElementById("burgerArea")
    const container = document.createElement("div")

    container.innerHTML = `
      <div class="bg-navy text-white text-center">
        <p class="p-2">0 Burgers</p>
        <p class="p-2">one click ￥25</p>
      </div>
      <div class="p-2 pt-5 d-flex justify-content-center hover-pointer">
        <img src="./image/burger.webp" alt="" srcset="" />
      </div>
    `
    burgerArea.append(container)
  }

  // 右のサイドバーのアイテム要素を描画
  static rightSidebarRendering() {
    const itemAreaContainer = document.getElementById("itemAreaContainer")
    const container = document.createElement("div")
    container.classList.add("bg-dark", "over-flow", "over-flow-height", "p-2")
    container.setAttribute("id", "itemArea")

    // ローカルストレージからデータを取得
    const userData = UserAccount.getLocalStrage()
    let htmlString = ""

    // データが存在していれば、そのデータを元にアイテムを生成する
    if (userData !== null) {

      for (let i = 0; i < userData.items.length; i++) {

        htmlString += `
        <div class="bg-navy text-white d-flex m-1 align-items-center p-3 item-card js-item-card">
          <div class="col-3"><img src="${userData.items[i].url}" alt="" srcset="" /></div>
          <div class="col-9">
            <div class="d-flex justify-content-between">
              <h4>${userData.items[i].name}</h4>
              <h4>￥${userData.items[i].currentAmount}</h4>
              </div>
              <div class="d-flex justify-content-between">
              <p>${userData.items[i].price}</p>
              <p class="text-success">￥${userData.items[i].perRate} / sec</p>
            </div>
          </div>
        </div>
        `
      }
    }

    container.innerHTML = htmlString

    itemAreaContainer.append(container)
  }

  // 右の上部ユーザーデータエリアを描画
  static userDataAreaRendering() {
    // INFO: ここで作成されるid属性
    // userDataArea
    // countDate

    const itemAreaContainer = document.getElementById("itemAreaContainer")
    const container = document.createElement("div")

    // ローカルストレージからデータを取得
    const userData = UserAccount.getLocalStrage()

    container.innerHTML = `
      <div class="bg-navy text-white pd-2 mb-2" id="userDataArea">
        <div class="d-flex justify-content-between">
          <div class="col-6 p-2 border-dark">${userData.name}</div>
          <div class="col-6 p-2 border-dark">${userData.age} years old</div>
        </div>
        <div class="d-flex">
          <div class="col-6 p-2 border-dark" date-count="0" id="countDate">0 days</div>
          <div class="col-6 p-2 border-dark">￥${userData.money}</div>
        </div>
      </div>
      `
    itemAreaContainer.append(container)
  }

  // アイテム購入ページを描画

  // セーブ、リセットエリアを描画
  static gameSaveArea() {
    // INFO: ここで作成されるid属性
    // reset
    // save

    const itemAreaContainer = document.getElementById("itemAreaContainer")
    const container = document.createElement("div")

    container.innerHTML = `
    <div class="d-flex justify-content-end mt-3">
      <div class="p-2 icon-border mr-2 hover-pointer" id="reset">
        <i class="fas fa-undo fa-2x text-white"></i>
      </div>
      <div class="p-2 icon-border hover-pointer" id="save">
        <i class="fas fa-save fa-2x text-white"></i>
      </div>
    </div>`

    itemAreaContainer.append(container)
  }
}

/**
* 
*/
class AppController {
  /**
   * 要素を表示するクラスを付与するメソッド
   * @param  {object} elem
   */
  static displayBlock(elem) {
    elem.classList.remove("d-none");
    elem.classList.add("d-block");
  }

  /**
   * 要素を非表示にするクラスを付与するメソッド
   * @param  {object} elem
   */
  static desplayNone(elem) {
    elem.classList.remove("d-block");
    elem.classList.add("d-none");
  }

  /**
   * ゲームを開始する
   * @param  {object} none
   * @param  {object} block
   */
  static newGame(none, block) {
    const form = document.getElementById("bank-form")
    const userNewGame = new UserAccount(form.querySelectorAll(`input[name="userName"]`)[0].value)
    userNewGame.setLocalstorage()
    this.displayBlock(block)
    this.desplayNone(none)

    config.empirePage.append(View.createEmpirePage())
    View.leftSidebarRendering()
    View.userDataAreaRendering()
    View.rightSidebarRendering()
    View.gameSaveArea()
  }

  /**
  * ゲームをロードする
  */
  static login() {
    const form = document.getElementById("bank-form")
    const userName = form.querySelectorAll(`input[name="userName"]`)[0].value
    let myLocalStrage = localStorage.getItem(userName)

    // 取得してきたlocalStorageのデータが空だった場合は実行しない
    if (myLocalStrage === null) {
      alert("データが保存されていません。")
      return;
    }

    // データが存在していたときの処理
  }

  /**
   * 日にちをカウントするメソッド
   */
  static dateCounter(elem) {
    let time = 0;
    setInterval(() => {
      time++
    }, 1000)
  }
}



/**
 * 初期化処理
 */
(function () {

  // トップページを描画
  loginPage.append(View.createLoginPage())
  // Loginボタンのイベントリスナーを追加
  View.loginButtonAddEvent()
  // NewGameボタンのイベントリスナーを追加
  View.newGameButtonAddEvent()

  // アイテム購入ページを非表示にしておく
  // AppController.desplayNone(config.empirePage)
  // AppController.desplayNone(config.itemPurchase)

  // NEWゲームボタンを押したときの処理
  // AppController.newGame(config.loginPage, config.empirePage);



  // 各種アイテムカードにイベントリスナーを設定する
  // const itemCard = document.querySelectorAll('.js-item-card')
  // for (let i = 0; i < itemCard.length; i++) {
  //   itemCard[i].addEventListener('click', () => {
  //     // AppController.desplayNone(config.itemArea)
  //     // AppController.displayBlock(config.itemPurchase)
  //   })
  // }

  // // アイテム購入ページから戻る処理
  // const backBtn = document.querySelectorAll('#back')
  // backBtn[0].addEventListener('click', () => {
  //   // AppController.desplayNone(config.itemPurchase)
  //   // AppController.displayBlock(config.itemArea)
  // })

}());

/**
 * ゲーム開始時の処理
*/
function initializeUserAccount() {

}
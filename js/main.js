const config = {
  mainPage: document.getElementById("mainPage"),
  loginPage: document.getElementById("loginPage"),
  empirePage: document.getElementById("empirePage"),
}

// グローバルオブジェクト、データの状態などここで管理する
let dataObj = {
  "age": "20",
  "name": "",
  "money": 50000,
  "clickCount": 0,
  "incomePerClick": 25,
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
      "maxAmount": Infinity,
      "perMoney": 0,
      "perRate": 0.1,
      "price": 300000,
      "url": "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
      "name": "ETF Bonds",
      "type": "investment",
      "currentAmount": 0,
      "maxAmount": Infinity,
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

class UserAccount {

  constructor(name) {
    this.name = name
    this.getLocalStrage(name)
  }

  /**
  * ゲーム開始時にユーザーデータをJSONにデータを保存する
  * @param  {string} name
  */
  setLocalstorage(userName) {
    // オブジェクトを文字列に変換して格納
    localStorage.setItem(userName, JSON.stringify(this.localStorageData))

    // ローカルストレージに保存した文字列のオブジェクトをオブジェクトに変換
    let myLocalStrage = localStorage.getItem(userName)
    console.log(JSON.parse(myLocalStrage));
  }

  /**
   * 
  */
  getLocalStrage(name) {
    let myLocalStrage = localStorage.getItem(name)
    if (myLocalStrage === null) {
      // グローバルオブジェクトにユーザー名をセット
      dataObj.name = name
      console.log('ローカルストレージにデータがありませんでした。新しくデータをセットします。')
    }

    console.log('ローカルストレージにデータが存在していました。')
    myLocalStrage = JSON.parse(myLocalStrage)
    dataObj = Object.assign(dataObj, myLocalStrage)
  }
}

/******************************
 * 画面の描画や更新を行うクラス
******************************/
class View {
  // ログインページを描画
  static createLoginPage() {
    // INFO: 
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
    // INFO: ここで作成されるid属性
    // itemSelect
    // burgerArea
    // itemAreaContainer

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
    // INFO: ここで作成されるid属性
    // burgerClick
    const container = document.createElement("div")

    container.innerHTML = `
      <div class="bg-navy text-white text-center" id="burgerInfo">
        <p class="p-2" id="burgerCountertPoint">${dataObj.clickCount} Burgers</p>
        <p class="p-2" id="burgerRate">one click ￥${dataObj.incomePerClick}</p>
      </div>
      <div class="p-2 pt-5 d-flex justify-content-center hover-pointer" id="burgerClick">
        <img src="./image/burger.webp" alt="" srcset="" />
      </div>
    `
    return container
  }

  // 右のサイドバーのアイテム要素を描画
  static rightSidebarRendering() {
    // INFO: ここで作成されるid属性
    // itemArea
    const container = document.createElement("div")
    container.classList.add("bg-dark", "over-flow", "over-flow-height", "p-2")
    container.setAttribute("id", "itemArea")
    const items = dataObj.items

    let htmlString = ""

    // データが存在していれば、そのデータを元にアイテムを生成する
    if (items !== null) {

      for (let i = 0; i < items.length; i++) {

        htmlString += `
        <div class="bg-navy text-white d-flex m-1 align-items-center p-3 item-card js-item-card">
          <div class="col-3"><img src="${items[i].url}" alt="" srcset="" /></div>
          <div class="col-9">
            <div class="d-flex justify-content-between">
              <h4>${items[i].name}</h4>
              <h4>￥${items[i].currentAmount}</h4>
              </div>
              <div class="d-flex justify-content-between">
              <p>${items[i].price}</p>
              <p class="text-success">￥${items[i].perRate} / sec</p>
            </div>
          </div>
        </div>
        `
      }
    }

    container.innerHTML = htmlString

    const itemCrads = container.querySelectorAll(".js-item-card")
    for (let i = 0; i < itemCrads.length; i++) {
      itemCrads[i].addEventListener("click", () => {
        View.itemSelectPageRendering(items[i], items)
        console.log("click!")
      })
    }

    return container
  }

  // 右の上部ユーザーデータエリアを描画
  static userDataAreaRendering() {
    // INFO: ここで作成されるid属性
    // userDataArea
    // userAge
    // countDate
    // burgerIncome

    const container = document.createElement("div")

    container.innerHTML = `
      <div class="bg-navy text-white pd-2 mb-2" id="userDataArea">
        <div class="d-flex justify-content-between">
          <div class="col-6 p-2 border-dark">${dataObj.name}</div>
          <div class="col-6 p-2 border-dark" data-age="${dataObj.age}" id=userAge>${dataObj.age} years old</div>
        </div>
        <div class="d-flex">
          <div class="col-6 p-2 border-dark" data-count="0" id="countDate">0 days</div>
          <div class="col-6 p-2 border-dark" id="burgerIncome">￥${dataObj.money}</div>
        </div>
      </div>
      `
    return container
  }

  // 1秒毎にユーザーデータ表示領域を再描画する
  static updateUserDateArea() {

    container.innerHTML = ""
    container.innerHTML = `
    <div class="bg-navy text-white pd-2 mb-2" id="userDataArea">
      <div class="d-flex justify-content-between">
        <div class="col-6 p-2 border-dark">${dataObj.name}</div>
        <div class="col-6 p-2 border-dark" data-age="${dataObj.age}" id=userAge>${dataObj.age} years old</div>
        </div>
        <div class="d-flex">
          <div class="col-6 p-2 border-dark" data-count="0" id="countDate">${dataObj.date} days</div>
          <div class="col-6 p-2 border-dark" id="burgerIncome">￥${dataObj.money}</div>
      </div>
    </div>
    `

    return container
  }

  // アイテム購入ページを描画
  static itemSelectPageRendering(item, items) {

    const container = document.createElement("div")
    let maxAmount = item.maxAmount === Infinity ? "∞" : item.maxAmount

    config.itemArea.innerHTML = ""
    container.innerHTML = `
    <div id="itemPurchase" class="over-flow-height">
      <div class="bg-dark item-card-height p-2">
        <div class="bg-navy p-2 m-1">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-white text-left">
              <h4>${item.name}</h4>
              <p class="mb-2 js-max-purchases">Max purchases: ${maxAmount}</p>
              <p class="mb-2 js-price">Price: ￥${item.price}</p>
              <p class="mb-2 js-get">Get ￥${item.perMoney} /click</p>
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
    `

    config.itemArea.append(container)

    container.querySelectorAll("#back")[0].addEventListener("click", () => {
      View.backItemSelectPage()
    })

    container.querySelectorAll("#purchase")[0].addEventListener("click", () => {
      AppController.purchaseItem()
    })

    container.querySelectorAll("#purchaseCount")[0].addEventListener("change", (event) => {
      AppController.changingCountPurchaseItem(event, items.price)
    })

  }

  // アイテム選択ページに戻るときの処理
  static backItemSelectPage() {
    config.itemAreaContainer.innerHTML = ""
    config.itemAreaContainer.append(View.userDataAreaRendering())
    config.itemAreaContainer.append(View.rightSidebarRendering())
    config.itemAreaContainer.append(View.gameSaveArea())
    AppController.addConfigElement(["itemArea"])
  }

  // セーブ、リセットエリアを描画
  static gameSaveArea() {
    // INFO: ここで作成されるid属性
    // reset
    // save
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

    container.querySelectorAll("#reset")[0].addEventListener("click", () => {
      AppController.gameReset()
    })

    container.querySelectorAll("#save")[0].addEventListener("click", () => {
      AppController.gameSave()
    })

    return container
  }
}

/********************************************
* 主にイベント時に実行する処理などをまとめたクラス
********************************************/
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

  // configに getElementById で取得した要素を追加する
  static addConfigElement(configNames = Array) {

    if (configNames.length !== 0) {
      for (let i = 0; i < configNames.length; i++) {
        config[configNames[i]] = document.getElementById(configNames[i])
        // console.log(`[debug]: configを追加しました。 ${configNames[i]}`)
        // console.log(config)
      }
    }
  }

  /**
   * ゲームを開始する
   * @param  {object} none
   * @param  {object} block
   */
  static newGame(none, block) {
    const form = document.getElementById("bank-form")
    const userName = form.querySelectorAll(`input[name="userName"]`)[0].value
    dataObj.name = userName

    const user = new UserAccount(userName)

    this.displayBlock(block)
    this.desplayNone(none)

    config.empirePage.append(View.createEmpirePage())
    AppController.addConfigElement(["itemSelect", "burgerArea", "itemAreaContainer"])

    config.burgerArea.append(View.leftSidebarRendering())
    AppController.addConfigElement(["burgerClick"])

    config.itemAreaContainer.append(View.userDataAreaRendering())
    AppController.addConfigElement(["userDataArea", "userAge", "countDate", "burgerIncome"])

    config.itemAreaContainer.append(View.rightSidebarRendering())
    AppController.addConfigElement(["itemArea"])

    config.itemAreaContainer.append(View.gameSaveArea())
    AppController.addConfigElement(["reset", "save"])

    // 日付をカウントするタイマーを実行
    AppController.dateCounter(config.countDate)

    AppController.burgerCountUPEvent()
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
    dataObj = Object.assign(dataObj, myLocalStrage)

    AppController.newGame(config.loginPage, config.empirePage)
  }

  /**
   * 日にちをカウントするメソッド
   */
  static dateCounter(elem) {
    let time = 0;
    let oneYear = 365

    // setInterval(() => {
    //   time++
    //   elem.innerHTML = `${time} days`
    //   config.userDataArea.append(View.updateUserDateArea(dataObj.name, dataObj.age, time, dataObj.money))
    //   if (time > oneYear) {
    //     time = 0
    //     dataObj.age++
    //     config.userDataArea.append(View.updateUserDateArea(dataObj.name, dataObj.age, time, dataObj.money))
    //   }
    // }, 1000)
  }

  // ハンバーガーがクリックされたときの動作
  static burgerCountUPEvent() {
    config.burgerClick.addEventListener("click", () => {
      dataObj.clickCount++
      dataObj.money += dataObj.incomePerClick
      AppController.burgerAreaUpdate(dataObj)
      AppController.burgerIncomeUpdate(dataObj)
    })
  }

  // ハンバーガーエリアの情報を更新する
  static burgerAreaUpdate(userData) {
    const burgerCountertPoint = document.getElementById("burgerCountertPoint")
    burgerCountertPoint.innerHTML = `${userData.clickCount} Burgers`
  }

  // ハンバーガーを焼いたことにより得た所得を更新する
  static burgerIncomeUpdate(userData) {
    const burgerIncomeArea = document.getElementById("burgerIncome")
    burgerIncomeArea.innerHTML = `￥${userData.money}`

  }

  // アイテムを選択したら購入ページに遷移するイベントをセット


  // 購入ボタンをクリックしたときの処理
  static purchaseItem() {
    const inputBox = document.getElementById("purchaseCount")
    console.log(inputBox.value)
  }

  // 購入する個数を選択するときに実行する処理（changeイベント）
  static changingCountPurchaseItem(event, itemPrice) {
    const purchaseTotal = document.querySelector(".js-purchases-total")
    purchaseTotal.innerHTML = `total: ￥${parseInt(event.target.value) * parseInt(itemPrice)}`
  }

  static gameReset() {
    if (window.confirm("現在の情報を消去します。よろしいですか？")) {
      localStorage.removeItem(dataObj.name);
      console.log('ローカルストレージの情報を消去しました')
      return
    }
  }

  static gameSave() {
    if (window.confirm("現在の情報を保存します。よろしいですか？")) {
      // setItem(key, string)
      // key: 取得や削除のときに指定するキー
      // string: 実際に保存するデータ（オブジェクイトを保存する場合は String型 に変換する）
      localStorage.setItem(dataObj.name, JSON.stringify(dataObj))
      console.log('ローカルストレージに保存しました')
      return
    }
  }

  static isYear(time, date) {
    if (time > date) {
      return 0
    }
  }
}



/**************
 * 初期化処理
 **************/
(function () {

  // トップページを描画
  loginPage.append(View.createLoginPage())
  // Loginボタンのイベントリスナーを追加
  View.loginButtonAddEvent()
  // NewGameボタンのイベントリスナーを追加
  View.newGameButtonAddEvent()
}());

/**
 * ゲーム開始時の処理
*/
function initializeUserAccount() {

}
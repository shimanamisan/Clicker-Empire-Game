function desplayNone(elem) {
  elem.classList.remove("d-block");
  elem.classList.add("d-none");
}

function displayBlock(elem) {
  elem.classList.remove("d-none");
  elem.classList.add("d-block");
}

const config = {
  firstView: document.getElementById("firstView"),
  initialForm: document.getElementById("initialForm"),
  empirePage: document.getElementById("empirePage"),
  newGameButton: document.getElementById("newGame"),
  LoginButton: document.getElementById("Login"),
}


class UserAccount {
  constructor(name) {
    this.userName = name
    this.setLocalstorage(this.userName)
  }

  /**
   * @param  {string} name
   */
  setLocalstorage(name) {
    const jsonString = `[{"age":4,"money":40,"time":344,"purchases":["card","pizza","burger"]}]`;
    // json文字列をオブジェクトに変換
    let jsonDecoded = JSON.parse(jsonString);
    let jsonEncoded = JSON.stringify(jsonDecoded)
    localStorage.setItem("username", jsonEncoded)
    let myLocalStrage = localStorage.getItem("username")
    console.log(myLocalStrage);
  }


  checkUserdata() {
    let myLocalStrage = localStorage.getItem("username")
    if (myLocalStrage === null) {
      alert("データが保存されていません。")
      return;
    }
    console.log(myLocalStrage);
  }
}

const user = new UserAccount("user01")
user.checkUserdata()

function initializeUserAccount(e) {


}

/**
 * 初期化処理
 */
(function () {

  config.newGameButton.addEventListener('click', () => {
    config.firstView.remove()
    displayBlock(config.empirePage)
  })

  config.LoginButton.addEventListener('click', () => {
    config.firstView.remove()
    displayBlock(config.empirePage)
  })
}());
/*

come back later ページで日にちを入力すると、入力された日にちから利子を計算し、残高にアップデートする処理を実装してください。
例えば、年利 10% で 200 ドルを預けておくと、1 年後には 220 ドルになります。
また Confirm を押すとダッシュボードに戻る処理も実装してください。

*/

function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele) {
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage"),
}

class BankAccount {
  maxWithdrawPercent = 0.2;

  // 年利8%を表す、クラス変数を追加してください。
  annualInterestRate = 0.08;


  constructor(firstName, lastName, email, type, accountNumber, money) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.accountNumber = accountNumber;
    this.money = money;
    this.initialDeposit = money;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }

  calculateWithdrawAmount(amount) {
    let maxWithdrawAmount = Math.floor(this.money * this.maxWithdrawPercent);
    amount = amount > maxWithdrawAmount ? maxWithdrawAmount : amount;
    return amount;
  }

  withdraw(amount) {
    this.money -= this.calculateWithdrawAmount(amount);
    return this.calculateWithdrawAmount(amount);
  }

  deposit(amount) {
    this.money += amount;
    return amount;
  }

  // 日にちを受け取って利子を計算するsimulateTimePassageというメソッドを作成してください。
  // 年利から日割り計算を行います。money * (1 + i) * days/365 で日割り計算を行うことができます。
  // 今回はday1から複利が適用されるとします。
  // (日にちが浅い場合は単利、日にちが経過した場合は複利のような計算もありますが、今回はシンプルに全ての計算を複利とします。)
  simulateTimePassage(days) {
    let daysPerYear = 365;
    let profit = (this.money * Math.pow(1 + this.annualInterestRate, days / daysPerYear)) - this.money;
    // 残高に反映
    this.money += profit;
    return profit;
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function initializeUserAccount() {
  const form = document.getElementById("bank-form");
  let userBankAccount = new BankAccount(
    form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
    form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
    form.querySelectorAll(`input[name="userEmail"]`)[0].value,
    form.querySelectorAll(`input[name="userAccountType"]:checked`).item(0).value,
    getRandomInteger(1, Math.pow(10, 8)),
    parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value),
  );
  console.log(userBankAccount);

  config.initialForm.classList.add("d-none");
  config.bankPage.append(mainBankPage(userBankAccount));
}

function mainBankPage(bankAccount) {
  let infoCon = document.createElement("div");
  infoCon.classList.add("pb-2", "pb-md-4", "text-right");

  let nameP = document.createElement("p");
  nameP.classList.add("py-1");

  let bankIdP = nameP.cloneNode(true);
  let initialDepositP = nameP.cloneNode(true);

  nameP.innerHTML = bankAccount.getFullName();
  bankIdP.innerHTML = bankAccount.accountNumber;
  initialDepositP.innerHTML = bankAccount.initialDeposit;

  infoCon.append(nameP, bankIdP, initialDepositP);

  let balanceCon = document.createElement("div");
  balanceCon.classList.add("d-flex", "bg-danger", "py-1", "py-md-2");

  balanceCon.innerHTML =
    `
      <p class="col-8 text-left rem1p5">Available Balance</p>
      <p class="col-4 text-right rem1p5">$${bankAccount.money}</p>
  `;

  let menuCon = document.createElement("div");
  menuCon.classList.add("d-flex", "justify-content-center", "flex-wrap", "text-center", "py-3", "mx-0");

  menuCon.innerHTML =
    `
      <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
          <div id="withdrawBtn" class="bg-blue hover p-3">
              <h5>WITHDRAWAL</h5>
              <i class="fas fa-wallet fa-3x"></i>
          </div>
      </div>
      <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
          <div id="depositBtn" class="bg-blue hover p-3">
              <h5>DEPOSIT</h5>
              <i class="fas fa-coins fa-3x"></i>
          </div>
      </div>
      <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
          <div id="comeBackLaterBtn" class="bg-blue hover p-3">
              <h5>COME BACK LATER</h5>
              <i class="fas fa-home fa-3x"></i>
          </div>
      </div>
  `;

  menuCon.querySelectorAll("#withdrawBtn")[0].addEventListener("click", function () {
    sideBankSwitch();
    config.sidePage.append(withdrawPage(bankAccount));
  });

  menuCon.querySelectorAll("#depositBtn")[0].addEventListener("click", function () {
    sideBankSwitch();
    config.sidePage.append(depositPage(bankAccount));
  });

  menuCon.querySelectorAll("#comeBackLaterBtn")[0].addEventListener("click", function () {
    sideBankSwitch();
    config.sidePage.append(comeBackLaterPage(bankAccount));
  });

  let container = document.createElement("div");
  container.append(infoCon, balanceCon, menuCon);

  return container;
}

function billInputSelector(title) {
  let container = document.createElement("div");
  container.innerHTML =
    `
      <h2 class="pb-3">${title}</h2>
      <div class="form-group row">
          <label for="moneyWithdraw100" class="col-2 col-form-label col-form-label-sm">$100</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="100" id="moneyWithdraw100" placeholder="5">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw50" class="col-2 col-form-label col-form-label-sm">$50</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="50" id="moneyWithdraw50" placeholder="1">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw20" class="col-2 col-form-label col-form-label-sm">$20</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="20" id="moneyWithdraw20" placeholder="2">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw10" class="col-2 col-form-label col-form-label-sm">$10</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="10" id="moneyWithdraw10" placeholder="3">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw5" class="col-2 col-form-label col-form-label-sm">$5</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="5" id="moneyWithdraw5" placeholder="1">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw1" class="col-2 col-form-label col-form-label-sm">$1</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="1" id="moneyWithdraw1" placeholder="4">
          </div>
      </div>
      <div class="text-center money-box p-3">
          <p id="totalBillAmount">$0.00</p>
      </div>
  `;
  return container;
}

function backNextBtn(backString, nextString) {
  let container = document.createElement("div");

  container.innerHTML =
    `
  <div class="d-flex justify-content-between">
      <div class="col-6 pl-0">
          <button class="btn btn-outline-primary col-12 back-btn">${backString}</button>
      </div>
      <div class="col-6 pr-0">
          <button class="btn btn-primary col-12 next-btn">${nextString}</button>
      </div>
  </div>
  `
  return container;
}

function sideBankSwitch() {
  displayNone(config.bankPage);
  displayBlock(config.sidePage);
  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
}

function bankReturn(bankAccount) {
  displayNone(config.sidePage);
  displayBlock(config.bankPage);
  config.bankPage.append(mainBankPage(bankAccount));
}

function withdrawPage(bankAccount) {
  let container = document.createElement("div");
  container.classList.add("p-5");

  let withdrawContainer = document.createElement("div");
  container.append(withdrawContainer);

  withdrawContainer.append(billInputSelector("Please Enter The Withdrawal Amount"));
  withdrawContainer.append(backNextBtn("back", "next"));

  let backBtn = withdrawContainer.querySelectorAll(".back-btn").item(0);
  backBtn.addEventListener("click", function () {
    bankReturn(bankAccount);
  })

  let billInputs = withdrawContainer.querySelectorAll(".bill-input");

  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function (event) {
      document.getElementById("totalBillAmount").innerHTML = billSummation(billInputs, "data-bill").toString();
    });
  }

  let nextBtn = withdrawContainer.querySelectorAll(".next-btn").item(0);
  nextBtn.addEventListener("click", function () {
    container.innerHTML = '';

    let confirmDialog = document.createElement("div");
    confirmDialog.append(billDialog("The money you are going to take is ...", billInputs, "data-bill"));
    container.append(confirmDialog);

    let total = billSummation(billInputs, "data-bill");
    let withdrawAmountPreview = bankAccount.calculateWithdrawAmount(total);

    confirmDialog.innerHTML +=
      `
          <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
              <p class="col-8 text-left rem1p5">Total to be withdrawn: </p>
              <p class="col-4 text-right rem1p5">$${bankAccount.calculateWithdrawAmount(total)}</p>
          </div>
      `

    let withdrawConfirmBtns = backNextBtn("Go Back", "Confirm");
    confirmDialog.append(withdrawConfirmBtns);

    let confirmBackBtn = withdrawConfirmBtns.querySelectorAll(".back-btn")[0];
    let confirmNextBtn = withdrawConfirmBtns.querySelectorAll(".next-btn")[0];

    confirmBackBtn.addEventListener("click", function () {
      container.innerHTML = "";
      container.append(withdrawContainer);
    });

    confirmNextBtn.addEventListener("click", function () {
      bankAccount.withdraw(total);
      bankReturn(bankAccount);
    });
  })

  return container;
}

function billSummation(inputElementNodeList, multiplierAttribute) {
  let summation = 0;
  for (let i = 0; i < inputElementNodeList.length; i++) {
    let currEle = inputElementNodeList[i];
    let value = parseInt(currEle.value);

    value = currEle.hasAttribute(multiplierAttribute) ? parseInt(currEle.getAttribute(multiplierAttribute)) * value : value;
    summation += value >= 0 ? value : 0;
  }
  return summation;
}

function billDialog(title, inputElementNodeList, multiplierAttribute) {
  let container = document.createElement("div");

  let billElements = '';
  for (let i = 0; i < inputElementNodeList.length; i++) {
    let value = parseInt(inputElementNodeList[i].value);

    if (value > 0) {
      let bill = "$" + inputElementNodeList[i].getAttribute(multiplierAttribute);
      billElements += `<p class="rem1p3 calculation-box mb-1 pr-2">${value} × ${bill}</p>`
    }
  }

  let totalString = `<p class="rem1p3 pr-2">total: $${billSummation(inputElementNodeList, multiplierAttribute)}</p>`;

  container.innerHTML =
    `
      <h2 class="pb-1">${title}</h2>
      <div class="d-flex justify-content-center">
          <div class="text-right col-8 px-1 calculation-box">
              ${billElements}
              ${totalString}
          </div>
      </div>
  `
  return container;
}

function depositPage(bankAccount) {
  let container = document.createElement("div");
  container.classList.add("p-5");

  let depositContainer = document.createElement("div");
  container.append(depositContainer);

  depositContainer.append(billInputSelector("Please Enter The Deposit Amount"));
  depositContainer.append(backNextBtn("back", "next"));

  let backBtn = depositContainer.querySelectorAll(".back-btn").item(0);
  backBtn.addEventListener("click", function () {
    bankReturn(bankAccount);
  })

  let billInputs = depositContainer.querySelectorAll(".bill-input");

  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function (event) {
      document.getElementById("totalBillAmount").innerHTML = billSummation(billInputs, "data-bill").toString();
    });
  }

  let nextBtn = depositContainer.querySelectorAll(".next-btn").item(0);

  nextBtn.addEventListener("click", function () {
    container.innerHTML = '';

    let confirmDialog = document.createElement("div");
    confirmDialog.append(billDialog("The money you are going to deposit is ...", billInputs, "data-bill"));
    container.append(confirmDialog);

    let total = billSummation(billInputs, "data-bill");
    confirmDialog.innerHTML +=
      `
          <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
              <p class="col-8 text-left rem1p5">Total to be withdrawn: </p>
              <p class="col-4 text-right rem1p5">$${total}</p>
          </div>
      `
    let depositConfirmBtns = backNextBtn("Go Back", "Confirm");
    confirmDialog.append(depositConfirmBtns);

    let confirmBackBtn = depositConfirmBtns.querySelectorAll(".back-btn")[0];
    let confirmNextBtn = depositConfirmBtns.querySelectorAll(".next-btn")[0];

    confirmBackBtn.addEventListener("click", function () {
      container.innerHTML = "";
      container.append(depositContainer);
    });

    confirmNextBtn.addEventListener("click", function () {
      bankAccount.deposit(total);
      bankReturn(bankAccount);
    });

  });

  return container;
}

function comeBackLaterPage(bankAccount) {
  let container = document.createElement("div");
  container.classList.add("p-5");

  container.innerHTML =
    `
      <div class="p-5">
          <h2 class="pb-3">How many days will you be gone?</h2>
          <div class="form-group">
              <input type="number" class="form-control" id="days-gone" placeholder="4">
          </div>
      </div>
  `

  container.append(backNextBtn("Back", "Confirm"));

  let backBtn = container.querySelectorAll(".back-btn")[0];

  backBtn.addEventListener("click", function () {
    bankReturn(bankAccount);
  })

  // Confirmボタンがクリックされた時、入力されている値を元に利子を計算し、残高に反映してください。
  // 例えば、年利8%で365日(1年間)このページに帰ってこないと仮定すると、残高は money * (1 + 0.08)になります。
  // このシミュレーションを残高に反映してください。
  // ここからJavaScriptを実装してください。

  // 処理のプロセス
  // ボタン要素を追加
  // そのボタン要素にクリックイベントを追加
  // イベント時に処理する処理
  // 1. days-gone の値を取得
  // 2. 値を数値に変換
  // 3. 0より大きければその値を返し、小さければ0を返す
  // 4. 利子を計算して、オブジェクト内の情報を更新する
  // 5. 計算後の値を返す
  let nextBtn = container.querySelectorAll(".next-btn")[0];

  nextBtn.addEventListener("click", function () {
    let daysGoneInput = container.querySelectorAll("#days-gone")[0];
    let totalDaysGone = parseInt(daysGoneInput.value);
    totalDaysGone = totalDaysGone > 0 ? totalDaysGone : 0;
    // simulateTimePassageというメソッドを作成します。
    bankAccount.simulateTimePassage(totalDaysGone);
    bankReturn(bankAccount);
  })

  return container;
}
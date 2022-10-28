import { AppController } from '../Contoroller/AppController';

export class LoginPage {
  #loginPage;
  #mainPage;
  #empirePage;
  constructor(mainPage, loginPage, empirePage) {
    this.#mainPage = mainPage;
    this.#loginPage = loginPage;
    this.#empirePage = empirePage;
  }

  createLoginPage() {
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
    this.addEvent(container, 'newGame', () => AppController.newGame(this.#loginPage, this.#empirePage));
    this.addEvent(container, 'Login', () => AppController.login(this.#loginPage, this.#empirePage));
    this.#loginPage.append(container);
  }

  addEvent(dom, id, func) {
    const selector = dom.querySelectorAll(`#${id}`)[0];
    selector.addEventListener('click', func);
  }
}

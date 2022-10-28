export class DataEntity {
  #age = '20';
  #name = '';
  #money = 500000000000;
  #clickCount = 0;
  #incomePerClick = 25;
  #incomePerSec = 0;
  #stock = 0;

  items = [
    {
      name: 'Flip machine',
      type: 'MachinePerformance',
      currentAmount: 0,
      maxAmount: 500,
      perMoney: 25,
      price: 15000,
      url: 'https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png',
    },
    {
      name: 'ETF Stock',
      type: 'investment',
      currentAmount: 0,
      maxAmount: Infinity,
      perMoney: 0.1,
      price: 300000,
      url: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png',
    },
    {
      name: 'ETF Bonds',
      type: 'investment',
      currentAmount: 0,
      maxAmount: Infinity,
      perMoney: 0.07,
      price: 300000,
      url: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png',
    },
    {
      name: 'Lemonade Stand',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 1000,
      perMoney: 30,
      price: 30000,
      url: 'https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png',
    },
    {
      name: 'Ice Cream Truck',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 500,
      perMoney: 120,
      price: 100000,
      url: 'https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png',
    },
    {
      name: 'House',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 100,
      perMoney: 32000,
      price: 20000000,
      url: 'https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png',
    },
    {
      name: 'TownHouse',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 100,
      perMoney: 64000,
      price: 40000000,
      url: 'https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png',
    },
    {
      name: 'Mansion',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 20,
      perMoney: 500000,
      price: 250000000,
      url: 'https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png',
    },
    {
      name: 'Industrial Space',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 10,
      perMoney: 2200000,
      price: 1000000000,
      url: 'https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png',
    },
    {
      name: 'Hotel Skyscraper',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 5,
      perMoney: 25000000,
      price: 10000000000,
      url: 'https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png',
    },
    {
      name: 'Bullet-Speed Sky Railway',
      type: 'realState',
      currentAmount: 0,
      maxAmount: 1,
      perMoney: 30000000000,
      price: 10000000000000,
      url: 'https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png',
    },
  ];

  constructor(name) {
    this.#name = name;
  }

  isArgsValid(num) {
    if (typeof num !== 'number' || num === null || num === undefined) return false;
    return true;
  }

  getAge() {
    return this.#age;
  }

  setAge(args) {
    if (!this.isArgsValid(args)) return;
    this.#age = num;
  }

  getName() {
    return this.#name;
  }

  getMoney() {
    return this.#money;
  }

  setMoney(args) {
    if (!this.isArgsValid(args)) return;
    this.#money = args;
  }

  getClickCount() {
    return this.#clickCount;
  }

  setClickCount(args) {
    if (!this.isArgsValid(args)) return;
    this.#clickCount = args;
  }

  getIncomePerClick() {
    return this.#incomePerClick;
  }

  setIncomePerClick(args) {
    if (!this.isArgsValid(args)) return;
    this.#incomePerClick = args;
  }

  getIncomePerSec() {
    return this.#incomePerSec;
  }

  setIncomePerSec(args) {
    if (!this.isArgsValid(args)) return;
    this.#incomePerSec = args;
  }

  getStock() {
    return this.#stock;
  }

  setStock(args) {
    if (!this.isArgsValid(args)) return;
    this.#stock = args;
  }
}

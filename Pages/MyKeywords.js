const { expect } = require('@playwright/test');

exports.myKey = class Mykeywords {

  constructor(page) {
    this.page = page;
  }

  async ClickWithLogDisplay(element, log) {
    await this.page.click(element);
    console.log('Clicking on ' +log);
  }
};
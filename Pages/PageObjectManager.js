const { expect } = require('@playwright/test');
const { myAsba } = require('./MyAsba');
const { myKey } = require('./MyKeywords');

exports.poManager = class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.myAsba = new myAsba(this.page);
        this.myKey = new myKey(this.page);
    }

    /**
     * 
     * @returns {myAsba}
     */
    myAsba()
    {
        return this.myAsba;
    }

    myKey()
    {
        return this.myKey;
    }



};
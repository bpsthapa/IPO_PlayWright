const { test, expect } = require('@playwright/test');
const { poManager } = require('../Pages/PageObjectManager');
const data=JSON.parse(JSON.stringify(require("../testData/Info.json")));

test('My IPO', async ({ page }) => {
    const po = new poManager(page);


    

    po.myAsba.visitUrl();

    //const myAsba=po.myAsba();
    // const myKey=po.myKey();



});
const { test, expect } = require('@playwright/test');
const { myAsba } = require('../Pages/MyAsba');
const data=JSON.parse(JSON.stringify(require("../testData/Info.json")));
const ordinaryShare="//span[contains(text(),'Ordinary Shares')]";


test.describe.serial('Login and Dashboard Flow - Series', () => {

    test('My IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName1,data.Password1);
        await asba.NavigateToMyAsba();

        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            await asba.EnterDetailsIPO(data.Bank1,data.Casba1);
            await asba.ClickOnSubmitButton(data.Pin)
        } 
        else 
        {
                console.log('Ordianary Share is not found.');
        }
        console.log('Share applied successfuly for Bipin Thapa')
    });

    test('Dad IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName2,data.Password2);
        await asba.NavigateToMyAsba();
        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            await asba.EnterDetailsIPO(data.Bank2,data.Casba2);
            await asba.ClickOnSubmitButton(data.Pin)
        } 
        else 
        {
                console.log('Ordianary Share is not found.');
        }
        console.log('Share applied successfuly for Dad')
    });

    test('Mom IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName3,data.Password3);
        await asba.NavigateToMyAsba();
        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            await asba.EnterDetailsIPO(data.Bank3,data.Casba3);
            await asba.ClickOnSubmitButton(data.Pin)
        } 
        else 
        {
            console.log('Ordianary Share is not found.');
        }
        console.log('Share applied successfuly for Mom')
    });
});


  //npx playwright test /Users/Bipinlp/Documents/Bps_Automation/IPO_PlayWright/tests/Apply_IPO.spec.js
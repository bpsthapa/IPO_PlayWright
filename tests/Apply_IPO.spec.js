import { test, expect } from '@playwright/test';
import { myAsba } from '../Pages/MyAsba';
import data from '../testData/Info.json';

const ordinaryShare="//span[contains(text(),'Ordinary Shares')]";

test.describe('Login and Dashboard Flow - Series', () => {

    test('My IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName1,data.Password1,data.Capital1);
        console.log(data.UserName1+' Login Successfuly');
        await asba.NavigateToMyAsba();
        console.log('Navigated to MyAsba page');

        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            console.log('Clicked on Apply Button');
            await asba.EnterDetailsIPO(data.Bank1,data.Casba1);
            console.log('Entered All the Details');
            await asba.ClickOnSubmitButton(data.Pin)
            console.log('✅ ✅ ✅Share applied successfuly for Bipin Thapa✅ ✅ ✅\n')

        } 
        else 
        {
                console.log('❌ ❌ ❌Ordianary Share is not found.❌ ❌ ❌\n');
        }

    });

    test('Dad IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName2,data.Password2,data.Capital2);
        console.log(data.UserName2+' Login Successfuly');
        await asba.NavigateToMyAsba();
        console.log('Navigated to MyAsba page');
        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            console.log('Clicked on Apply Button');
            await asba.EnterDetailsIPO(data.Bank2,data.Casba2);
             console.log('Entered All the Details');
            await asba.ClickOnSubmitButton(data.Pin)
            console.log('✅ ✅ ✅Share applied successfuly for Dad✅ ✅ ✅\n')
        } 
        else 
        {
                console.log('❌ ❌ ❌Ordianary Share is not found.❌ ❌ ❌\n');
        }
        
    });

    test('Mom IPO', async ({ page }) => {
        const asba = new myAsba(page);
        await page.goto(data.Url);
        await asba.Login(data.UserName3,data.Password3,data.Capital2);
        console.log(data.UserName3+' Login Successfuly');
        await asba.NavigateToMyAsba();
        console.log('Navigated to MyAsba page');
        await page.waitForTimeout(4000);
        if (await page.locator(ordinaryShare).isVisible()) {
            console.log('Ordinary Share is Available');
            await asba.SelectIPO();
            await asba.EnterDetailsIPO(data.Bank3,data.Casba3);
            console.log('Entered All the Details');
            await asba.ClickOnSubmitButton(data.Pin)
            console.log('✅ ✅ ✅Share applied successfuly for Mom✅ ✅ ✅\n')
        } 
        else 
        {
            console.log('❌ ❌ ❌Ordianary Share is not found.❌ ❌ ❌\n');
        }

    });
});


  //npx playwright test /Users/Bipinlp/Documents/Bps_Automation/IPO_PlayWright/tests/Apply_IPO.spec.js
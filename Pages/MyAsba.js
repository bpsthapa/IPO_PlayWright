import { test, expect } from '@playwright/test';

exports.myAsba = class MyAsba {

  constructor(page) {
    this.page = page;
  }

  async Login(UserName, Password, capital) {
    await this.page.click("span.select2-selection__placeholder");
    //await this.page.fill("input[type='search']", 'PRABHU');
    //await this.page.click("//li[text()='NIC ASIA BANK LIMITED (13700)']");
    
    await this.page.click("//li[text()='"+capital+"']");
    await this.page.fill('#username', UserName);
    await this.page.fill('#password', Password);
    await this.page.click('.btn.sign-in');
    await this.page.waitForLoadState('networkidle'); //all the network items are loaded   
  }

  async NavigateToMyAsba() {
    //Navigate to My asba
    await this.page.click('i.msi.msi-asba');
    await this.page.waitForLoadState('networkidle'); //all the network items are loaded    
  }

  async SelectIPO() {
    await this.page.waitForLoadState('networkidle'); //all the network items are loaded
    await this.page.locator("span[tooltip='Share Group']").last().waitFor();
    await this.logicToEnterEntoAppyPage();
    await this.page.waitForLoadState('networkidle');
  }

  async EnterDetailsIPO(bank, crn) {
    await this.page.waitForTimeout(2000);
    const text = await this.page.locator(":nth-child(5) > .form-group > .form-value > span").textContent();
    console.log("The Cost of Stock Per Share is :" + text)
    const cost = parseInt(text, 10);
    console.log('Cost of share per kitta:', cost);

    const Highprice = 300;
    const lowPrice = 90

    // Assert that cost is less than Highprice
    expect(cost).toBeLessThan(Highprice);

    // Assert that cost is greater than lowPrice
    expect(cost).toBeGreaterThan(lowPrice);

    // Select bank and perform other actions
    await this.page.selectOption('#selectBank', bank);
    await this.page.selectOption('#accountNumber', { index: 1 });
    //Need Branch Name
    await this.page.fill("#appliedKitta", '10');  // Apply kitta
    await this.page.fill("#crnNumber", crn);
    
    await this.page.click('#disclaimer');
    await this.page.waitForLoadState('networkidle');
    //await this.page.pause(); // Test execution will pause, and you'll be able to interact with the browser
  }

  async ClickOnSubmitButton(pin) {
    // Click on the Proceed button
    await this.page.locator("//span[contains(text(), 'Proceed')]").click();
    //Type in the transaction PIN
    await this.page.fill('#transactionPIN', pin);
    console.log("Click on Confirm button")
    //await this.page.pause();
    // await page.waitForTimeout(300000);
    await this.page.click("div[class='confirm-page-btn'] button[type='submit']")
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    console.log("The ipo has been applied")
  }

  async logicToEnterEntoAppyPage() {
    const allShareType = await this.page.locator("span[tooltip='Share Group']").allTextContents();
    console.log(allShareType)
    const listedShare = await this.page.locator("div.company-list")
    const count = await listedShare.count();
    console.log("The number of listed share is: " + count)

    for (let i = 0; i < count; ++i) {
      //const shareType="\n                  Ordinary Shares\n                ";
      const availableShareType = await listedShare.nth(i).locator("span[tooltip='Share Group']").textContent();
      console.log(availableShareType)
      if (availableShareType.includes('Ordinary Shares'))
      //if(availableShareType==shareType)
      {
        console.log("inside if and value of i is " + i)
        const a = i + 1
        try {
          await this.page.click("(//i[contains(text(),'Apply')])[" + a + "]");
        }
        catch (error) {
          console.warn(`Apply Button not found inside Ordainary Share:`, error);
          continue; // continue to next iteration
        }
      }
    }
  }
};
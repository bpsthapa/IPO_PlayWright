const { expect } = require('@playwright/test');
const { console } = require('inspector');

exports.myAsba = class MyAsba {

  constructor(page) {
    this.page = page;
  }

  async visitUrl() {
    console.log('working');
    await this.page.goto('https://playwright.dev');
  }

  async Login(UserName,Password) {
    await this.page.click("span.select2-selection__placeholder");
    await this.page.fill("input[type='search']",'GLOBAL');
    await this.page.click("//li[text()='GLOBAL IME CAPITAL LIMITED (11200)']");
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
    
}


async EnterDetailsIPO(bank, crn) {  
    await this.page.waitForTimeout(2000);
    const text = await this.page.locator(":nth-child(5) > .form-group > .form-value > span").textContent();
    console.log("The Cost of Stock Per Share is :"+text)
    const cost = parseInt(text, 10);
    console.log('Cost of share per kitta:', cost);

    const Highprice=300;
    const lowPrice=90
    // Log and perform the assertion
   


    // Assert that cost is less than Highprice
    expect(cost).toBeLessThan(Highprice);

    // Assert that cost is greater than lowPrice
    expect(cost).toBeGreaterThan(lowPrice);

    // Select bank and perform other actions
    await this.page.selectOption('#selectBank', bank);
    await this.page.selectOption('#accountNumber', {index:1});
    //Need Branch Name
    await this.page.fill("#appliedKitta", '10');  // Apply kitta
    await this.page.fill("#crnNumber", crn);
    await this.page.click('#disclaimer');

    // Pause for debugging (optional)
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
    console.log("The ipo has been applied")
}  

async logicToEnterEntoAppyPage()
{
    const allShareType=await this.page.locator("span[tooltip='Share Group']").allTextContents();
    console.log(allShareType)

    const listedShare=await this.page.locator("div.company-list")
    const count=await listedShare.count();
    console.log("The number of listed share is: "+count)

    for(let i=0; i<count; ++i)
    {
        //const shareType="\n                  Ordinary Shares\n                ";
        const availableShareType=await listedShare.nth(i).locator("span[tooltip='Share Group']").textContent();
        console.log(availableShareType)
        if(availableShareType.includes('Ordinary Shares'))
        //if(availableShareType==shareType)
        {
        console.log("inside if and value of i is "+i)
        //inside div.company-list.nth(1)
        //await listedShare.nth(i).click("//button[@type='button']");
          const a=i+1
          await this.page.click("(//i[contains(text(),'Apply')])["+a+"]")

        }
    }
}

async logicToEnterEntoAppyPageall()
{
  const ShareWithApply=await this.page.locator("//button[contains(@class, 'btn-issue')]//i[text()='Apply']")
  const count=await ShareWithApply.count();
  const listedShare=await this.page.locator("div.company-list")
  console.log("The number of listed share is with apply button is :"+count)

  for(let i=0; i<count; ++i)
  {
      await ShareWithApply.nth(i).click("text=Apply");
      const ShareType=await this.page.locator("//span[@tooltip='Share Group' and @class='isin']").textContent();

      if(shareType.includes('Ordinary Shares'))
      {
        console.log("inside if")
        //inside div.company-list.nth(1)
        const AppylyButton=await page.locator("text=Apply").isVisible()

        const isApplyVisible = await page.locator("text=Apply").isVisible();
    
          if (!(await page.locator("text=Apply").isVisible())) {
            return; // Exit out of if condition if "Apply" button is not visible
          }
          
        await listedShare.nth(i).click("text=Apply");
      }
      else
      {
        await this.page.click("//i[@class='mdi mdi-arrow-left']");
      }
  }
}

};
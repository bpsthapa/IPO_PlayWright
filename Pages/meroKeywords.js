import { test, expect } from '@playwright/test';

exports.myAsba = class MyAsba {

  constructor(page) {
    this.page = page;
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
        //await this.page.click("(//i[contains(text(),'Apply')])["+a+"]")
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

    async logicToApplyUnit() {
      const text = await this.page.locator(":nth-child(5) > .form-group > .form-value > span").textContent();
      console.log("The total No. Of Issued Share is:" + text)
      const totalIssuedShare = parseInt(text, 10);

      const perUser=totalIssuedShare/2000000

      if (perUser<) {
        console.log("The number is even.");
      } else {
        console.log("The number is odd.");
      }

    }

};




Units You Want	Minimum Shares Issued Needed
10 units	20,000,000 × 10 = 20,000,000 shares
20 units	2,000,000 × 20 = 40,000,000 shares
30 units	2,000,000 × 30 = 60,000,000 shares
40 units	2,000,000 × 40 = 80,000,000 shares
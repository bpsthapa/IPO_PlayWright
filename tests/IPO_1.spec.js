import { test, expect } from '@playwright/test';
import { json } from 'stream/consumers';
const data=JSON.parse(JSON.stringify(require("../testData/Info.json")));

test('Login to MeroShare', async ({ page }) => {
  await page.goto(data.Url);
  await page.click("span.select2-selection__placeholder");
  await page.fill("input[type='search']",'GLOBAL');
  await page.click("//li[text()='GLOBAL IME CAPITAL LIMITED (11200)']");
  await page.fill('#username', data.UserName1);
  await page.fill('#password', data.Password1);
  await page.click('.btn.sign-in');
  
  await page.click('i.msi.msi-asba');
  //await page.waitForLoadState('networkidle'); //all the network items are loaded
  await page.locator("span[tooltip='Share Group']").last().waitFor();
  const allShareType=await page.locator("span[tooltip='Share Group']").allTextContents();
  console.log(allShareType)

  //const shareType=await page.locator("span[tooltip='Share Group']")
  const listedShare=await page.locator("div.company-list")
  const count=await listedShare.count();
  console.log("The number of listed share is: "+count)
  for(let i=0; i<count; ++i)
  {
    const shareType="\n                  Ordinary Shares\n                ";
    const availableShareType=await listedShare.nth(i).locator("span[tooltip='Share Group']").textContent();
    console.log(availableShareType)
    if(availableShareType==shareType)
    {
      console.log("inside if")
      await listedShare.nth(i).click("text=Apply");
    }
  }
  await page.pause(); 
  await EnterDetails(page,data.Bnk1,data.Casba1,data.Pin)
});



async function EnterDetails(page, bank, crn, pin) {
  const text = await page.locator(":nth-child(5) > .form-group > .form-value > span").textContent();
  const cost = parseInt(text, 10);

  const Highprice=300;
  const lowPrice=9
  // Log and perform the assertion
  console.log('Cost of share per kitta:', cost);


  // Assert that cost is less than Highprice
  expect(cost).toBeLessThan(Highprice);

  // Assert that cost is greater than lowPrice
  expect(cost).toBeGreaterThan(lowPrice);

  // Select bank and perform other actions
  await page.selectOption('#selectBank', bank);
  //Need Branch Name
  await page.fill("#appliedKitta", '10');  // Apply kitta
  await page.fill("#crnNumber", crn);
  await page.click('#disclaimer');

  // Pause for debugging (optional)
  await page.pause(); // Test execution will pause, and you'll be able to interact with the browser

  // Click on the Proceed button
  await page.locator('.card-footer > .btn-primary > span').click();

  // Type in the transaction PIN
  //wait page.fill('#transactionPIN', pin);
}

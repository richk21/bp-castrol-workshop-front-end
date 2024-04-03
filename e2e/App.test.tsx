const puppeteer = require('puppeteer');

describe('Signup Page', () => {
  let browser:any;
  let page:any;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({ headless: false });
      page = await browser.newPage();
    } catch (error) {
      console.error('Failed to launch browser:', error);
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });
  
  /*   it('Navigate to home page and click on apply button to reach login page', async () => {
      try {
        await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded'});
        console.log('Page title:', await page.title()); // Log page title for debugging
*/
        //log whole page
        /* const pagecontent = await page.content();
        console.log("CONTENTTTTTTTT:",pagecontent) */

        // Wait for the Apply Now button to appear
        /*await page.waitForSelector('._homePageButton_7wljo_45');
        console.log('Apply Now button found',);

        // Click the Apply Now button
        await page.click('._homePageButton_7wljo_45');
        console.log('Clicked Apply Now button'); // Log message indicating button is clicked

        // navigate
        console.log('Navigation completed'); // Log message indicating navigation is complete

        // Assert that the URL has changed to the expected page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://127.0.0.1:5173/login');
      } catch (error) {
        console.error('Test failed:', error);
      }
    }, 10000); */

  it('Navigate to home page and click on signup button to reach signup page', async () => {
    try {
      await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });
      console.log('Page title:', await page.title()); // Log page title for debugging

      //log navbar
      const navbarContent = await page.$eval('._navbar_jp3fr_21', (el: { innerHTML: any; }) => el.innerHTML);
      console.log("Navbar Content:", navbarContent);

      // Wait for the Apply Now button to appear
      await page.waitForSelector('._outline_15241_89 _md_15241_43 _button_15241_27', { timeout: 10000 });
      console.log('Sign Up button found',);

      // Click the Apply Now button
      await page.click('._outline_15241_89 _md_15241_43 _button_15241_27');
      console.log('Sign Up button clicked'); // Log message indicating button is clicked

      // Wait for navigation to occur
      await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });
      console.log('Navigation completed'); // Log message indicating navigation is complete

      // Assert that the URL has changed to the expected page after clicking the button
      console.log('Current URL:', page.url());
      expect(page.url()).toBe('http://127.0.0.1:5173/signup');
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000);
});
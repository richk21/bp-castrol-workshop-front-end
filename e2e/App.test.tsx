const puppeteer = require('puppeteer');

describe('End To End Tests', () => {
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
  
  //Login-Logout Related tests
    it('Navigate to Application Upload page from Home(Before Login) Page', async () => {
      //1. starting from home page url
      //2. click on the Apply Now button
      //3. we reach the login page
      //4. user logs in providing correct email and password->check if application upload page is reached
      
      try {
        // step 1
          await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded'});
          console.log('Page title:', await page.title()); // Log page title for debugging
         

        //log whole page
        /* const pagecontent = await page.content();
        console.log("CONTENTTTTTTTT:",pagecontent) */

        //step 2
          // Wait for the Apply Now button to appear
         await page.waitForSelector('._homePageButton_7wljo_45');
          console.log('Apply Now button found',);

          // Click the Apply Now button
          await page.click('._homePageButton_7wljo_45');
          console.log('Clicked Apply Now button'); // Log message indicating button is clicked

        //step 3
          //check for alert about loggin in before applying
          await page.waitForSelector('._alertContainer_7h75f_1._error_7h75f_37');
          console.log("Warning error message for Logging in received");

          // Assert that the URL has changed to the login page after clicking the button
          console.log('Current URL:', page.url());
          expect(page.url()).toBe('http://127.0.0.1:5173/login');
        
        //step 4
          //log the user in providing correct username and password
          await page.type('#user_email_id', 'richa21kiran@gmail.com');
          await page.type('#user_password', 'PASSWORDpassword123');
          console.log("Entered Email and Password");

          //click on the login button
          await page.click('._buttonscontainer_8uoy6_145 button._solid_15241_63._md_15241_43._button_15241_27 ')
          console.log("Clicked Login Button")

          //wait for browser to navigate to application upload page
          await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

          //check if application upload page has been reached
          console.log('Current URL:', page.url());
          expect(page.url()).toBe('http://127.0.0.1:5173/upload');

      } catch (error) {
        console.error('Test failed:', error);
      }
    }, 10000);

    it('Logging Out', async()=>{
      //1. load the home page(after login)->due to previous test case
      //2. find and click on the logout option
      try {
        // step 1
          await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded'});
          console.log('Page title:', await page.title()); // Log page title for debugging

        //step 2
          // click on logout
          await page.click('a[href="/logout"]');
          console.log('Clicked logout');

          //check if Home(Before login) page has been reached
          console.log('Current URL:', page.url());
          expect(page.url()).toBe('http://127.0.0.1:5173/');


      } catch (error) {
        console.error('Test failed:', error);
      }
    }, 10000)

  it('Navigates to Login Page from Home(Before Login) Page and Signs the User in.', async () => {
      //1. Navigate to the login page from home page
      //2. logs the user in using correct email, password -> check if brwoser reaches Home(After Login) Page.
      try {
        //Step 1
          await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });
  
          // Wait for the login button to appear
          await page.waitForSelector('._authContainer_jp3fr_85 button._solid_15241_63._md_15241_43._button_15241_27', { timeout: 5000 });
          console.log('Login button found',);
  
          // Click the Login button
          await page.click('._authContainer_jp3fr_85 button._solid_15241_63._md_15241_43._button_15241_27');
          console.log('Login button clicked');
  
          // Assert that the URL has changed to the login page after clicking the button
          console.log('Current URL:', page.url());
          expect(page.url()).toBe('http://127.0.0.1:5173/login');

        //Step 2
          //log the user in providing correct username and password
          await page.type('#user_email_id', 'richa21kiran@gmail.com');
          await page.type('#user_password', 'PASSWORDpassword123');
          console.log("Entered Email and Password");

          //click on the login button
          await page.click('._buttonscontainer_8uoy6_145 button._solid_15241_63._md_15241_43._button_15241_27 ')
          console.log("Clicked Login Button")

          //wait for browser to navigate to application upload page
          await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

          //check if home page has been reached
          console.log('Current URL:', page.url());
          expect(page.url()).toBe('http://127.0.0.1:5173/');

      } catch (error) {
        console.error('Test failed:', error);
      }
    }, 10000);

  //Sign Up Related Tests
  /* it('Navigates to Sign Up Page from Home Page, Register the User, finally Signs the User in', async () => {
    //1. Navigate to the sign up page from home page
    //2. Registers the user given correct email/phone no, password and OTP
    //3. logs the user in using the same email/ph no, password
    try {
      //step 1
        await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });
        console.log('Page title:', await page.title()); // Log page title for debuggin

        // Wait for the Apply Now button to appear
        await page.waitForSelector('button._outline_15241_89._md_15241_43._button_15241_27', { timeout: 5000 });
        console.log('Sign Up button found',);

        // Click the Apply Now button
        await page.click('button._outline_15241_89._md_15241_43._button_15241_27');
        console.log('Sign Up button clicked'); // Log message indicating button is clicked

        // Wait for navigation to occur
        //await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });
        console.log('Navigation completed'); // Log message indicating navigation is complete

        // Assert that the URL has changed to the expected page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://127.0.0.1:5173/signup');
      //step 2

      //step 3
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000); */

});
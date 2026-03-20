import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { LoginPage } from '../pages/loginpage';
import { fetchOtp } from '../utils/gmailApiReader';
import { CustomWorld } from '../support/world';
import dotenv from 'dotenv';

dotenv.config();

let loginPage: LoginPage;

Before(async function (this: CustomWorld) {
  await this.init();
  loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.close();
});

Given('I open NRL signup page', async function () {
  await loginPage.navigate();
});

When(
  'I enter valid email and submit',
  { timeout: 20000 },
  async function () {
    await loginPage.enterEmail();
  }
);

Then(
  'I Fetch OTP and Complete signup',
  { timeout: 60000 },
  async function () {
    console.log('Waiting for OTP from Gmail API...');

    const otp = await fetchOtp();

    if (!otp) {
      throw new Error('OTP not found in email');
    }

    console.log('OTP received:', otp);

    await loginPage.enterOtp(otp);
  }
);

// Optional: Enable after login verification implemented
// Then('I should be logged in successfully', async function () {
//   await loginPage.verifyLoginSuccess();
// });
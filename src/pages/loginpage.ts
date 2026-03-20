import { Page, expect } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  constructor(private page: Page) { }

  private emailInput = '#a0-signup-form input[type="email"]';
  private continueBtn = '#database';
  private otpInput = '#code';
  //*[@id="code"]
  private verifyBtn = 'button[type="submit"]';


  async navigate() {
    await this.page.goto(process.env.URL!);

  }

  async enterEmail() {
    // await this.page.locator('#adu-root a').first().click()     -previous
    await this.page.getByRole('link', { name: 'Sign up' }).first().click();
    await this.page.getByLabel('Email').fill(process.env.EMAIL!);
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
    await this.page.screenshot({ path: 'Pictures/screenshot1.png', fullPage: true });

  }

  async enterOtp(otp: string) {
    await this.page.fill(this.otpInput, otp);
    await this.page.screenshot({ path: 'Pictures/screenshot2.png', fullPage: true });
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
    await this.page.screenshot({ path: 'Pictures/screenshot3.png', fullPage: true });

  }

  // async verifyLoginSuccess() {
  //   await expect(this.page).toHaveURL(/dashboard|home|success/);
  // }
}
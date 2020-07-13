import {browser, by, element, ElementFinder} from 'protractor';

export class AppPage {

  navigateToBaseUrl(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getAppName(): Promise<string> {
    return element(by.id('app-name')).getText() as Promise<string>;
  }

  getInitSignUpButtonText(): Promise<string> {
    return element(by.id('a-sign-up')).getText() as Promise<string>;
  }

  clickSignUp(): void {
    element(by.id('a-sign-up')).click();
  }

  getSignUpCard(): ElementFinder {
    return element(by.id('sign-up-submit-card'));
  }

  getSignUpSubmitButton(): ElementFinder {
    return element(by.id('b-sign-up'));
  }

  setUpFormData(): void {
    element(by.id('first-name')).sendKeys('fist name');
    element(by.id('last-name')).sendKeys('last name');
    element(by.id('email')).sendKeys('email@email.ee');
    element(by.id('password')).sendKeys('Password');
  }

  getSubmitResultCard(): ElementFinder {
    return element(by.id('sign-up-result-card'));
  }

}

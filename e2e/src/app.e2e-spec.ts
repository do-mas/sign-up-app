import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('The Sign Up App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct app name.', () => {
    page.navigateToBaseUrl();
    expect(page.getAppName()).toEqual('The Sign-Up App');
  });

  it('should have sign-up init action.', () => {
    expect(page.getInitSignUpButtonText()).toEqual('Sign up!');
  });

  it('should open sign-up form after clicking the sign-up init action.', () => {
    page.clickSignUp();
    expect(page.getSignUpCard()).toBeDefined();
    expect(page.getSignUpSubmitButton().getText()).toBe('Sign up!');
  });

  it('should have sign-up submit action disabled when no data entered.', () => {
    expect(page.getSignUpSubmitButton().isEnabled()).toEqual(false);
  });

  it('should have sign-up submit action enabled when data entered.', () => {
    page.setUpFormData();
    expect(page.getSignUpSubmitButton().isEnabled()).toEqual(true);
  });

  it('should congratulate signing up person when sign-up is complete.', () => {
    page.getSignUpSubmitButton().click();
    expect(page.getSubmitResultCard().getText()).toContain('Congrats, Fist Name!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

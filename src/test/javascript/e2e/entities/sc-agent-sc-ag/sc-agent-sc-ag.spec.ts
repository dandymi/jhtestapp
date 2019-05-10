/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SCAgentComponentsPage, SCAgentDeleteDialog, SCAgentUpdatePage } from './sc-agent-sc-ag.page-object';

const expect = chai.expect;

describe('SCAgent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sCAgentUpdatePage: SCAgentUpdatePage;
  let sCAgentComponentsPage: SCAgentComponentsPage;
  let sCAgentDeleteDialog: SCAgentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SCAgents', async () => {
    await navBarPage.goToEntity('sc-agent-sc-ag');
    sCAgentComponentsPage = new SCAgentComponentsPage();
    await browser.wait(ec.visibilityOf(sCAgentComponentsPage.title), 5000);
    expect(await sCAgentComponentsPage.getTitle()).to.eq('jhtestappApp.sCAgent.home.title');
  });

  it('should load create SCAgent page', async () => {
    await sCAgentComponentsPage.clickOnCreateButton();
    sCAgentUpdatePage = new SCAgentUpdatePage();
    expect(await sCAgentUpdatePage.getPageTitle()).to.eq('jhtestappApp.sCAgent.home.createOrEditLabel');
    await sCAgentUpdatePage.cancel();
  });

  it('should create and save SCAgents', async () => {
    const nbButtonsBeforeCreate = await sCAgentComponentsPage.countDeleteButtons();

    await sCAgentComponentsPage.clickOnCreateButton();
    await promise.all([
      sCAgentUpdatePage.setFirstNameInput('firstName'),
      sCAgentUpdatePage.setLastNameInput('lastName'),
      sCAgentUpdatePage.setMobilePhoneInput('mobilePhone'),
      sCAgentUpdatePage.setEmailInput('email'),
      sCAgentUpdatePage.setScCodeCitizenInput('scCodeCitizen'),
      sCAgentUpdatePage.setIbanInput('iban'),
      sCAgentUpdatePage.setExpireDateSContractInput('2000-12-31')
    ]);
    expect(await sCAgentUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await sCAgentUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await sCAgentUpdatePage.getMobilePhoneInput()).to.eq('mobilePhone', 'Expected MobilePhone value to be equals to mobilePhone');
    expect(await sCAgentUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await sCAgentUpdatePage.getScCodeCitizenInput()).to.eq(
      'scCodeCitizen',
      'Expected ScCodeCitizen value to be equals to scCodeCitizen'
    );
    expect(await sCAgentUpdatePage.getIbanInput()).to.eq('iban', 'Expected Iban value to be equals to iban');
    expect(await sCAgentUpdatePage.getExpireDateSContractInput()).to.eq(
      '2000-12-31',
      'Expected expireDateSContract value to be equals to 2000-12-31'
    );
    await sCAgentUpdatePage.save();
    expect(await sCAgentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sCAgentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SCAgent', async () => {
    const nbButtonsBeforeDelete = await sCAgentComponentsPage.countDeleteButtons();
    await sCAgentComponentsPage.clickOnLastDeleteButton();

    sCAgentDeleteDialog = new SCAgentDeleteDialog();
    expect(await sCAgentDeleteDialog.getDialogTitle()).to.eq('jhtestappApp.sCAgent.delete.question');
    await sCAgentDeleteDialog.clickOnConfirmButton();

    expect(await sCAgentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

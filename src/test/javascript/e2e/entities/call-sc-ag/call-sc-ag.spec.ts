/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CallComponentsPage, CallDeleteDialog, CallUpdatePage } from './call-sc-ag.page-object';

const expect = chai.expect;

describe('Call e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let callUpdatePage: CallUpdatePage;
  let callComponentsPage: CallComponentsPage;
  let callDeleteDialog: CallDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Calls', async () => {
    await navBarPage.goToEntity('call-sc-ag');
    callComponentsPage = new CallComponentsPage();
    await browser.wait(ec.visibilityOf(callComponentsPage.title), 5000);
    expect(await callComponentsPage.getTitle()).to.eq('jhtestappApp.call.home.title');
  });

  it('should load create Call page', async () => {
    await callComponentsPage.clickOnCreateButton();
    callUpdatePage = new CallUpdatePage();
    expect(await callUpdatePage.getPageTitle()).to.eq('jhtestappApp.call.home.createOrEditLabel');
    await callUpdatePage.cancel();
  });

  it('should create and save Calls', async () => {
    const nbButtonsBeforeCreate = await callComponentsPage.countDeleteButtons();

    await callComponentsPage.clickOnCreateButton();
    await promise.all([callUpdatePage.setDateCallInput('2000-12-31'), callUpdatePage.stateCallSelectLastOption()]);
    expect(await callUpdatePage.getDateCallInput()).to.eq('2000-12-31', 'Expected dateCall value to be equals to 2000-12-31');
    await callUpdatePage.save();
    expect(await callUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await callComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Call', async () => {
    const nbButtonsBeforeDelete = await callComponentsPage.countDeleteButtons();
    await callComponentsPage.clickOnLastDeleteButton();

    callDeleteDialog = new CallDeleteDialog();
    expect(await callDeleteDialog.getDialogTitle()).to.eq('jhtestappApp.call.delete.question');
    await callDeleteDialog.clickOnConfirmButton();

    expect(await callComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

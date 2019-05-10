/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CallHistoryComponentsPage, CallHistoryDeleteDialog, CallHistoryUpdatePage } from './call-history-sc-ag.page-object';

const expect = chai.expect;

describe('CallHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let callHistoryUpdatePage: CallHistoryUpdatePage;
  let callHistoryComponentsPage: CallHistoryComponentsPage;
  let callHistoryDeleteDialog: CallHistoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CallHistories', async () => {
    await navBarPage.goToEntity('call-history-sc-ag');
    callHistoryComponentsPage = new CallHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(callHistoryComponentsPage.title), 5000);
    expect(await callHistoryComponentsPage.getTitle()).to.eq('jhtestappApp.callHistory.home.title');
  });

  it('should load create CallHistory page', async () => {
    await callHistoryComponentsPage.clickOnCreateButton();
    callHistoryUpdatePage = new CallHistoryUpdatePage();
    expect(await callHistoryUpdatePage.getPageTitle()).to.eq('jhtestappApp.callHistory.home.createOrEditLabel');
    await callHistoryUpdatePage.cancel();
  });

  it('should create and save CallHistories', async () => {
    const nbButtonsBeforeCreate = await callHistoryComponentsPage.countDeleteButtons();

    await callHistoryComponentsPage.clickOnCreateButton();
    await promise.all([
      callHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      callHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      callHistoryUpdatePage.actionSelectLastOption(),
      callHistoryUpdatePage.callSelectLastOption()
    ]);
    expect(await callHistoryUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await callHistoryUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    await callHistoryUpdatePage.save();
    expect(await callHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await callHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CallHistory', async () => {
    const nbButtonsBeforeDelete = await callHistoryComponentsPage.countDeleteButtons();
    await callHistoryComponentsPage.clickOnLastDeleteButton();

    callHistoryDeleteDialog = new CallHistoryDeleteDialog();
    expect(await callHistoryDeleteDialog.getDialogTitle()).to.eq('jhtestappApp.callHistory.delete.question');
    await callHistoryDeleteDialog.clickOnConfirmButton();

    expect(await callHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

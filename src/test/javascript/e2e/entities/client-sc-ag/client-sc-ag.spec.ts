/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client-sc-ag.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientUpdatePage: ClientUpdatePage;
  let clientComponentsPage: ClientComponentsPage;
  let clientDeleteDialog: ClientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clients', async () => {
    await navBarPage.goToEntity('client-sc-ag');
    clientComponentsPage = new ClientComponentsPage();
    await browser.wait(ec.visibilityOf(clientComponentsPage.title), 5000);
    expect(await clientComponentsPage.getTitle()).to.eq('jhtestappApp.client.home.title');
  });

  it('should load create Client page', async () => {
    await clientComponentsPage.clickOnCreateButton();
    clientUpdatePage = new ClientUpdatePage();
    expect(await clientUpdatePage.getPageTitle()).to.eq('jhtestappApp.client.home.createOrEditLabel');
    await clientUpdatePage.cancel();
  });

  it('should create and save Clients', async () => {
    const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

    await clientComponentsPage.clickOnCreateButton();
    await promise.all([
      clientUpdatePage.setDenominationInput('denomination'),
      clientUpdatePage.setVatCodeInput('vatCode'),
      clientUpdatePage.setWebSiteInput('webSite'),
      clientUpdatePage.setNotesInput('notes'),
      clientUpdatePage.setDateAddedInput('2000-12-31'),
      clientUpdatePage.setDateExpireInput('2000-12-31'),
      clientUpdatePage.stateSelectLastOption(),
      clientUpdatePage.setDateStateInput('2000-12-31'),
      clientUpdatePage.setNotesStateInput('notesState'),
      clientUpdatePage.sCAgentSelectLastOption(),
      clientUpdatePage.callSelectLastOption()
    ]);
    expect(await clientUpdatePage.getDenominationInput()).to.eq('denomination', 'Expected Denomination value to be equals to denomination');
    expect(await clientUpdatePage.getVatCodeInput()).to.eq('vatCode', 'Expected VatCode value to be equals to vatCode');
    expect(await clientUpdatePage.getWebSiteInput()).to.eq('webSite', 'Expected WebSite value to be equals to webSite');
    expect(await clientUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');
    expect(await clientUpdatePage.getDateAddedInput()).to.eq('2000-12-31', 'Expected dateAdded value to be equals to 2000-12-31');
    expect(await clientUpdatePage.getDateExpireInput()).to.eq('2000-12-31', 'Expected dateExpire value to be equals to 2000-12-31');
    expect(await clientUpdatePage.getDateStateInput()).to.eq('2000-12-31', 'Expected dateState value to be equals to 2000-12-31');
    expect(await clientUpdatePage.getNotesStateInput()).to.eq('notesState', 'Expected NotesState value to be equals to notesState');
    await clientUpdatePage.save();
    expect(await clientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Client', async () => {
    const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
    await clientComponentsPage.clickOnLastDeleteButton();

    clientDeleteDialog = new ClientDeleteDialog();
    expect(await clientDeleteDialog.getDialogTitle()).to.eq('jhtestappApp.client.delete.question');
    await clientDeleteDialog.clickOnConfirmButton();

    expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

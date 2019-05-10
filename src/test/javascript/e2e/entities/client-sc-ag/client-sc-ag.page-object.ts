import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ClientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-client-sc-ag div table .btn-danger'));
  title = element.all(by.css('jhi-client-sc-ag div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ClientUpdatePage {
  pageTitle = element(by.id('jhi-client-sc-ag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  denominationInput = element(by.id('field_denomination'));
  vatCodeInput = element(by.id('field_vatCode'));
  webSiteInput = element(by.id('field_webSite'));
  notesInput = element(by.id('field_notes'));
  dateAddedInput = element(by.id('field_dateAdded'));
  dateExpireInput = element(by.id('field_dateExpire'));
  stateSelect = element(by.id('field_state'));
  dateStateInput = element(by.id('field_dateState'));
  notesStateInput = element(by.id('field_notesState'));
  sCAgentSelect = element(by.id('field_sCAgent'));
  callSelect = element(by.id('field_call'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDenominationInput(denomination) {
    await this.denominationInput.sendKeys(denomination);
  }

  async getDenominationInput() {
    return await this.denominationInput.getAttribute('value');
  }

  async setVatCodeInput(vatCode) {
    await this.vatCodeInput.sendKeys(vatCode);
  }

  async getVatCodeInput() {
    return await this.vatCodeInput.getAttribute('value');
  }

  async setWebSiteInput(webSite) {
    await this.webSiteInput.sendKeys(webSite);
  }

  async getWebSiteInput() {
    return await this.webSiteInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return await this.notesInput.getAttribute('value');
  }

  async setDateAddedInput(dateAdded) {
    await this.dateAddedInput.sendKeys(dateAdded);
  }

  async getDateAddedInput() {
    return await this.dateAddedInput.getAttribute('value');
  }

  async setDateExpireInput(dateExpire) {
    await this.dateExpireInput.sendKeys(dateExpire);
  }

  async getDateExpireInput() {
    return await this.dateExpireInput.getAttribute('value');
  }

  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption(timeout?: number) {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDateStateInput(dateState) {
    await this.dateStateInput.sendKeys(dateState);
  }

  async getDateStateInput() {
    return await this.dateStateInput.getAttribute('value');
  }

  async setNotesStateInput(notesState) {
    await this.notesStateInput.sendKeys(notesState);
  }

  async getNotesStateInput() {
    return await this.notesStateInput.getAttribute('value');
  }

  async sCAgentSelectLastOption(timeout?: number) {
    await this.sCAgentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sCAgentSelectOption(option) {
    await this.sCAgentSelect.sendKeys(option);
  }

  getSCAgentSelect(): ElementFinder {
    return this.sCAgentSelect;
  }

  async getSCAgentSelectedOption() {
    return await this.sCAgentSelect.element(by.css('option:checked')).getText();
  }

  async callSelectLastOption(timeout?: number) {
    await this.callSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async callSelectOption(option) {
    await this.callSelect.sendKeys(option);
  }

  getCallSelect(): ElementFinder {
    return this.callSelect;
  }

  async getCallSelectedOption() {
    return await this.callSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ClientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-client-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-client'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

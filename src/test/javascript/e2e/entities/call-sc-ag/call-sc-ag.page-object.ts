import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CallComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-call-sc-ag div table .btn-danger'));
  title = element.all(by.css('jhi-call-sc-ag div h2#page-heading span')).first();

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

export class CallUpdatePage {
  pageTitle = element(by.id('jhi-call-sc-ag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateCallInput = element(by.id('field_dateCall'));
  stateCallSelect = element(by.id('field_stateCall'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateCallInput(dateCall) {
    await this.dateCallInput.sendKeys(dateCall);
  }

  async getDateCallInput() {
    return await this.dateCallInput.getAttribute('value');
  }

  async setStateCallSelect(stateCall) {
    await this.stateCallSelect.sendKeys(stateCall);
  }

  async getStateCallSelect() {
    return await this.stateCallSelect.element(by.css('option:checked')).getText();
  }

  async stateCallSelectLastOption(timeout?: number) {
    await this.stateCallSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class CallDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-call-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-call'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

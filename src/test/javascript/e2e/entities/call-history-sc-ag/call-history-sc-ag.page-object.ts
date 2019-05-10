import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CallHistoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-call-history-sc-ag div table .btn-danger'));
  title = element.all(by.css('jhi-call-history-sc-ag div h2#page-heading span')).first();

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

export class CallHistoryUpdatePage {
  pageTitle = element(by.id('jhi-call-history-sc-ag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  actionSelect = element(by.id('field_action'));
  callSelect = element(by.id('field_call'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return await this.endDateInput.getAttribute('value');
  }

  async setActionSelect(action) {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect() {
    return await this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption(timeout?: number) {
    await this.actionSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class CallHistoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-callHistory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-callHistory'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

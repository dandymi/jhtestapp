import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SCAgentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sc-agent-sc-ag div table .btn-danger'));
  title = element.all(by.css('jhi-sc-agent-sc-ag div h2#page-heading span')).first();

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

export class SCAgentUpdatePage {
  pageTitle = element(by.id('jhi-sc-agent-sc-ag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  mobilePhoneInput = element(by.id('field_mobilePhone'));
  emailInput = element(by.id('field_email'));
  scCodeCitizenInput = element(by.id('field_scCodeCitizen'));
  ibanInput = element(by.id('field_iban'));
  expireDateSContractInput = element(by.id('field_expireDateSContract'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setMobilePhoneInput(mobilePhone) {
    await this.mobilePhoneInput.sendKeys(mobilePhone);
  }

  async getMobilePhoneInput() {
    return await this.mobilePhoneInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setScCodeCitizenInput(scCodeCitizen) {
    await this.scCodeCitizenInput.sendKeys(scCodeCitizen);
  }

  async getScCodeCitizenInput() {
    return await this.scCodeCitizenInput.getAttribute('value');
  }

  async setIbanInput(iban) {
    await this.ibanInput.sendKeys(iban);
  }

  async getIbanInput() {
    return await this.ibanInput.getAttribute('value');
  }

  async setExpireDateSContractInput(expireDateSContract) {
    await this.expireDateSContractInput.sendKeys(expireDateSContract);
  }

  async getExpireDateSContractInput() {
    return await this.expireDateSContractInput.getAttribute('value');
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

export class SCAgentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sCAgent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sCAgent'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

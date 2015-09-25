import PageObject from './base';

export default class MainRoute extends PageObject {
  constructor() {
    super(...arguments);
  }

  fillInFirstName(value) {
    return this.fillInByName('first-name', value);
  }

  fillInLastName(value) {
    return this.fillInByName('last-name', value);
  }

  fillInJobTitle(value) {
    return this.fillInByName('job-title', value);
  }

  assertIsValid(name) {
    return this.then(() => {
      this.assert.ok(findWithAssert(`input.is-valid[name="${name}"]`).length, `${name} input has no validation errors`);
    });
  }

  assertIsInvalid(name) {
    return this.then(() => {
      this.assert.ok(findWithAssert(`input.is-invalid[name="${name}"]`).length, `${name} input has validation errors`);
    });
  }

  assertNoValidation(name) {
    return this.then(() => {
      const valid = find(`input.is-valid[name="${name}"]`).length;
      const invalid = find(`input.is-invalid[name="${name}"]`).length;
      this.assert.equal(valid + invalid, 0, `${name} input has not been validated`);
    });
  }

  assertDisplaysErrorText(fieldName, containsText) {
    return this.then(() => {
      this.assert.ok(findWithAssert(`.error-message.${fieldName}:contains("${containsText}")`).length, `${fieldName} has error message "${containsText}"`);
    });
  }

  assertNoErrorText(fieldName) {
    return this.then(() => {
      this.assert.equal(find(`.error-message.${fieldName}`).length, 0, `${fieldName} has no error message`);
    });
  }
}

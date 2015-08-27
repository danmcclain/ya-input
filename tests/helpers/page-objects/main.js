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
}

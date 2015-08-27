export default class PageObject {
  constructor(assert, options) {
    this.assert = assert;
    this.options = options;
  }

  // find
  findByDisabled(tagName = '', type = 'submit') {
    return findWithAssert(`${tagName}[type="${type}"][disabled]`);
  }

  findByType(tagName = '', type = 'submit') {
    return findWithAssert(`${tagName}[type="${type}"]`);
  }

  findInputByName(name) {
    return findWithAssert(`input[name="${name}"]`);
  }

  findInputsWithErrors(errorSelector = '.has-error') {
    return findWithAssert(`input${errorSelector}`);
  }

  // assertions
  assertCurrentUrl(targetUrl = `/${this.options.routeName}`) {
    return this.then(() => {
      const currentUrl = currentURL();

      this.assert.equal(currentUrl, targetUrl, 'it redirects to the correct url');
    });
  }

  assertVisitUrl(targetUrl = `/${this.options.routeName}`) {
    visit(targetUrl);

    return this.assertCurrentUrl(targetUrl);
  }

  assertSubmitButtonIsDisabled() {
    return this.then(() => {
      const button = this.findByDisabled('button', 'submit');

      this.assert.ok(button.length, 'it disables the submit button');
    });
  }

  assertInputsHaveErrorClass(expectedLength = 1) {
    return this.then(() => {
      const errors = this.findInputsWithErrors();

      this.assert.equal(errors.length, expectedLength, 'it has the correct number of errored inputs');
    });
  }

  // interactions
  fillInByName(name, value) {
    return this.then(() => {
      const input = this.findInputByName(name);

      fillIn(input, value)
      .then(() => {
        return find(input).focusout();
      });
    });
  }

  clickSubmitButton() {
    return this.then(() => {
      const button = this.findByType('button', 'submit');

      click(button);
    });
  }

  // utils
  debug() {
    return this.then(() => {
      // jshint ignore:start
      debugger;
      eval();
      // jshint ignore:end
    });
  }

  then(callback) {
    andThen(callback);

    return this;
  }
}

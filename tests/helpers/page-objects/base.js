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
        .then(() => input.focusout());
    });
  }

  clickSubmitButton() {
    return this.then(() => {
      const button = this.findByType('button', 'submit');

      click(button);
    });
  }

  focusInByName(name) {
    return this.then(() => this.findInputByName(name).focusin());
  }

  // utils
  /**
   * Pauses a test so you can look around within a PageObject chain.
   *
   * ```js
   *  test('foo', function(assert) {
   *    new SomePage(assert)
   *      .login()
   *      .embiggen()
   *      .pause()
   *      .doStuff();
   *  });
   * ```
   * @method pause
   * @param {Void}
   * @return {this}
   */
  pause() {
    return this.then(() => window.pauseTest());
  }

  /**
   * Embiggens the testing container for easier inspection.
   *
   * @method embiggen
   * @param {String} testContainerId
   * @return {this}
   */
  embiggen(testContainerId = 'ember-testing-container') {
    return this.then(() => $(`#${testContainerId}`).css({ width: '100vw', height: '100vh' }));
  }

  /**
   * Throws a breakpoint via debugger within a PageObject chain.
   *
   * ```js
   *  test('foo', function(assert) {
   *    new SomePage(assert)
   *      .login()
   *      .debug()
   *      .doStuff();
   *  });
   * ```
   *
   * @method debug
   * @param {Void}
   * @return {this}
   */
  debug() {
    // jshint ignore:start
    const poInstance = this; // deopt Babel so `this` is accessible
    return this.then((applicationInstance) => {
      console.info('Access the PageObject with `poInstance`, and the application instance with `applicationInstance`.');
      debugger;
      eval();
    });
    // jshint ignore:end
  }

  then(callback) {
    andThen(callback);
    return this;
  }
}

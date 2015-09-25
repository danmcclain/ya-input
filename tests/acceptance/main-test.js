import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';
import MainRoute from '../../tests/helpers/page-objects/main';

const { run } = Ember;

module('Acceptance | main', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    run(this.application, 'destroy');
  }
});

test('it displays validation errors when inputs have focused out', (assert) => {
  assert.expect(4);

  return new MainRoute(assert, { routeName: '/' })
    .assertVisitUrl()
    .fillInFirstName('Milton')
    .fillInLastName('Waddams')
    .fillInJobTitle('Fashion Model')
    .assertIsValid('first-name')
    .assertIsValid('last-name')
    .assertIsValid('job-title');
});

test('it does not display validation errors when inputs have not focused out', (assert) => {
  assert.expect(4);

  return new MainRoute(assert, { routeName: '/' })
    .assertVisitUrl()
    .assertNoValidation('first-name')
    .assertNoValidation('last-name')
    .assertNoValidation('job-title');
});

test('it sets values and updates validation', (assert) => {
  assert.expect(4);

  return new MainRoute(assert, { routeName: '/' })
    .assertVisitUrl()
    .fillInFirstName(null)
    .fillInLastName(null)
    .fillInJobTitle(null)
    .assertIsInvalid('first-name')
    .assertIsInvalid('last-name')
    .assertIsInvalid('job-title');
});

test('it validates when `shouldShowValidationErrors` is `true`', (assert) => {
  assert.expect(5);

  return new MainRoute(assert, { routeName: '/' })
    .assertVisitUrl()
    .clickSubmitButton()
    .assertIsValid('first-name')
    .assertIsValid('last-name')
    .assertIsInvalid('job-title')
    .fillInJobTitle('Fashion Model')
    .assertIsValid('job-title');
});

test('it shows the right validation when focused in', (assert) => {
  assert.expect(3);

  return new MainRoute(assert, { routeName: '/' })
    .assertVisitUrl()
    .fillInFirstName('Milton')
    .focusInByName('first-name')
    .assertIsValid('first-name')
    .fillInFirstName(null)
    .focusInByName('first-name')
    .assertIsInvalid('first-name');
});

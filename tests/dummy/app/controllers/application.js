import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { Controller } = Ember;

export default Controller.extend(EmberValidations, {
  validations: {
    name: {
      presence: true
    }
  }
});

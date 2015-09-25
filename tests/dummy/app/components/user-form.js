import Ember from 'ember';
import ValidationsMixin from 'ember-validations';

const {
  Component,
  computed: { alias },
  get,
  set
} = Ember;

export default Component.extend(ValidationsMixin, {
  model: alias('user'),
  validations: {
    'model.firstName': {
      presence: true,
      length: { minimum: 2 }
    },
    'model.lastName': {
      presence: true,
      length: { minimum: 2 }
    },
    'model.jobTitle': {
      presence: true,
      length: { minimum: 2 }
    }
  },

  actions: {
    save() {
      set(this, 'shouldShowValidationErrors', get(this, 'isInvalid'));
    }
  }
});

// import Ember from 'ember';
import yaForm from 'ya-form/components/ya-form/component';
import ValidationsMixin from 'ember-validations';

export default yaForm.extend(ValidationsMixin, {
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
  }
});

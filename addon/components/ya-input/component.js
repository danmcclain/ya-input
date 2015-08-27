import Ember from 'ember';
import layout from '../../templates/ya-input';

const {
  Component,
  addObserver,
  getProperties,
  isEmpty,
  observer,
  on,
  computed,
  run
} = Ember;

const { next: runNext } = run;

const {
  oneWay
} = computed;

const get = Ember.get;
const set = Ember.set;

export default Component.extend({
  layout: layout,
  classNameBindings: ['validClass', 'type'],

  field: '',
  canShowErrors: false,
  hasLostFocus: false,

  errorText: oneWay('errors.firstObject'),

  fieldObserver: observer('value', function() {
    const props  = getProperties(this, 'form.model', 'field-name');
    set(props['form.model'], props['field-name'], get(this, 'value'));
  }),

  setErrorsObserver: on('init', observer('form.model', 'field-name', function() {
    const fieldName = get(this, 'field-name');
    const valueKey = `form.model.${fieldName}`;
    const errorsKey = `form.model.errors.${fieldName}`;

    if (isEmpty(fieldName)) {
      // might want to teardown
      return;
    }

    addObserver(this, valueKey, this, this._updateValue);
    addObserver(this, errorsKey, this, this._updateErrors);

    this._updateValue(this, valueKey);
    this._updateErrors(this, errorsKey);
  })),

  _updateValue(component, key) {
    set(component, 'value', get(component, key));
  },

  _updateErrors(component, key) {
    set(component, 'errors', get(component, key));
  },

  errorsObserver: observer('errors.length', 'hasLostFocus', 'form.model.shouldShowValidationErrors', function() {
    runNext(() => {
      const errorsCount = get(this, 'errors.length');
      const hasLostFocus = get(this, 'hasLostFocus');
      const shouldShowValidationErrors = get(this, 'form.model.shouldShowValidationErrors');

      if (errorsCount === 0) {
        set(this, 'canShowErrors', false);
      } else if (errorsCount > 0 && (hasLostFocus || shouldShowValidationErrors)) {
        set(this, 'canShowErrors', true);
      }
    });
  }),

  validClass: computed('canShowErrors', 'errorText', 'focusedOnce', 'form.model.shouldShowValidationErrors', {
    get() {
      if (get(this, 'focusedOnce') || get(this, 'form.model.shouldShowValidationErrors')) {
        if (get(this, 'canShowErrors')) {
          return 'is-invalid';
        } else {
          return 'is-valid';
        }
      }

      return;
    }
  }),

  focusIn() {
    set(this, 'hasLostFocus', false);
    set(this, 'initialFocus', true);
  },

  focusOut() {
    set(this, 'focusedOnce', true);
    set(this, 'hasLostFocus', true);
  }
});

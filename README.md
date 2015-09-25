# Ya-input

How to use: (depends on ya-form)

```hbs
{{#ya-form this as |form|}}
  <h2>Test Form</h2>

  {{! Pass ya-input the form yielded by ya-form, and the name of the field you want to make the input for, using positional params }}
  {{! By default, wraps in a div that has the valid class bound to it, can change it via the tagName property }}
  {{! ya-input yields itself }}
  {{#ya-input form "name" tagName="header" as |yaInput|}}

    <label for={{yaInput.inputId}}>Name</label>

    {{! Bind your input's value to the value property on yaInput }}
    {{! You can bind the valid class to your input as well }}
    {{input
        id=yaInput.inputId
        name=yaInput.name
        type=yaInput.type
        value=yaInput.value
        classBinding=":blah yaInput.validClass"
    }}

    {{! yaInput has a property that tells you whether or not to show errors for that field }}
    {{! errors are only shown when the field loses focus }}
    {{#if yaInput.canShowErrors}}
      {{! ya-input will return the first error for the given field }}
      {{yaInput.errorText}}
    {{/if}}
  {{/ya-input}}
{{/ya-form}}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

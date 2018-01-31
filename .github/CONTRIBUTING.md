## Coding Standards

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

Our presentational components:

* Are concerned with how things look.
* May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
* Have no dependencies on the rest of the app, such as ngrx actions or stores.
* Don’t specify how the data is loaded or mutated.
* Receive data and callbacks exclusively via @Input().
* Rarely have their own state (when they do, it’s UI state rather than data).
* Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
* Examples: Sidenav, UserForm, DataTable, Header.

Our container components:

* Are concerned with how things work.
* May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
* Provide the data and behavior to presentational or other container components.
* Dispatch ngrx actions and handle events emitted by presentational components.
* Are often stateful, as they tend to serve as data sources.
* Examples: CheckIn, DataDisplay, SettingsPage.

### Pure Functions

[What is a pure function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)

* A function is only pure if, given the same input, it will always produce the same output.
* JavaScript’s object arguments are references, which means that if a function were to mutate a property on an object or array parameter, that would mutate state that is accessible outside the function. Pure functions must not mutate external state.
* A pure function produces no side effects, which means that it can’t alter any external state.

## Commit message guidelines

The seven rules of a great Git commit message:

>Keep in mind: This has all been said before.

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

**NOTE: This project is still in heavy development and is not ready for actual
use at this time. Releasing to the open source community is aimed at getting
feedback and help from the community.**

---

LuxUI
=====

LuxUI is a UI rendering framework focused on translating API resource
representations into fully interactive web interfaces. Representations provide
all necessary information about a resource, and the UI elements it requires.
This will enable non-UI developers/engineers, through standardized description
of resources, to build consistent and beautiful UIs without ever needing to
dive into UI code; CSS, HTML, or JavaScript.

LuxUI requires API responses to follow the [Siren][Siren] hypermedia standard
with some [additional restrictions][Siren+lux]; these are a set of decisions
which have been made to reduce ambiguity and increase consistency between APIs.

## Installation

Install LuxUI as a dependency in your project:

```
$ npm install --save @luxui/luxReact
```

## Usage

Projects using LuxUI must provide two configuration options: an API root URI
(`apiRoot`) and a location to render the application to (`renderRoot`). The API
root URI should be an absolute URI to the root resource of the API "backing"
the application. The render location should be a `id` of a DOM resource that
the implementation code will be able to "own" for application rendering.

Then you will be able to use LuxUI in your application(s):

```
import luxReact from '@luxui/luxReact';

const app = luxReact({
  apiRoot: 'http://api.root',
  renderRoot: '#renderRoot',
});

app.render();
```

## API implementation

For more information about what responses from the API should be and why read
through the [API Implementation Guide](API_IMPLEMENTATION.md).

## Contributing

If you would like to get involved in the development of the project we would
appreciate your help; please review the [Contributing Guide][Contribute] and
browse the open Pull Requests and Issues for ideas on where to focus.

---

## Project Goals

An ultimate goal of LuxUI is to make the following statement completely true:

  > "The API is in control of everything."

The tactics that LuxUI employs to accomplish this goal are:

  - Standardized data contract ([Siren+lux][Siren+lux])
    1. **No** "shared knowledge" between "backend" and "frontend".
    2. Document all application logic in API responses.
    3. The API has independent control of: workflow, access control, etc.
  - UI customization
    1. [Plugins][plugins] allow for specialized domain solutions.
    2. Static content pages in-app rather than contrived API resources.
    3. Full control and access to CSS.

### Why?

  1. Create a reason for APIs to become standardized in response format.
  2. Give non-UI developers control of the UI in a familiar way; API data.
  3. Enable UI developers to build more general-purpose web components.
  4. Stop building custom single-use UI elements.
  5. Working towards a consistent UX across many applications.
  6. Make moving between projects a consistent experience.
  7. Intelligently decouple rendering responsibilities and business logic.
  8. Enable updates to many applications in a consistent, scheduled,
      repeatable, and safe way.

---

## License

[MIT](LICENSE.md)

[Contribute]: CONTRIBUTING.md
[plugins]: PLUGINS.md
[ReactJS]: https://facebook.github.io/react/
[Siren]: https://github.com/kevinswiber/siren
[Siren+lux]: SIREN+LUX.md

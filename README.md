**NOTE: This project is still in heavy development and is not ready for actual
use at this time. Releasing to the open source community is aimed at getting
feedback and help from the community.**

---

LuxUI
=====

LuxUI is a web UI rendering framework. LuxUI translates API resources into
fully interactive web applications. LuxUI empowers API developers to build
consistent, well-structured, diverse UIs without ever needing to work in CSS,
HTML, or JavaScript. LuxUI requires API responses to follow the [Siren][Siren]
hypermedia standard with some additional restrictions ([Siren+lux][Siren+lux]).

## Installation

Install LuxUI as a dependency in your project:

```bash
$ npm install --save @luxui/luxReact
```

## Usage

Projects using LuxUI must provide two configuration settings: an API root URI
(`apiRoot`) and a location to render the application to (`renderRoot`). The API
root URI should be an absolute URI to the root resource of the API "backing"
the application. The render location should be a `id` of a DOM resource that
the implementation code will be able to "own" for application rendering.

Then you will be able to use LuxUI in your application(s):

```javascript
import luxReact from '@luxui/luxReact';

const app = luxReact({
  apiRoot: 'http://api.root',
  renderRoot: '#renderRoot',
});

app.render();
```

### Static Pages

Some applications will have a need for pages that aren't represented in the API
as resources. LuxUI provides a way to register specific URLs that will be
handled by a custom handlers. Once you have defined the implementation specific
handler the way pages are registered are as follows:

```javascript
import luxReact from '@luxui/luxReact';

import homePageHandler from './homePageHandler';

const app = luxReact({
  apiRoot: 'http://api.root',
  renderRoot: '#renderRoot',
});

app
  .page('/home', homePageHandler)
  .render();
```

All pages will make an API call to the root resource of that API for meta
information - such as main menu links, login status, etc. - and will then
receive a responseModel object of that request.

## API implementation

For more information about what responses from the API should be and why read
through the [API Implementation Guide](API_IMPLEMENTATION.md).

## Contributing

If you would like to get involved in the development of the project we would
appreciate your help; please review the [Contributing Guide][Contribute] and
browse the open Pull Requests and Issues for ideas on where to focus.

## Useful Links

  - [Module Documentation](http://git/pages/luxui/lux-core/docs/)
  - [Code Coverage Report](http://git/pages/luxui/lux-core/coverage/lcov-report/)

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
  9. Allow for independent evolution of API and UI elements.
  10. Isolate testing requirements.

### Browser Support

These will be the supported versions; at this time there is no specific browser
testing or validation. If you find problems please report them as issues.

  - Chrome - current, and current - 1
  - MS - Edge; IE > 9 (newer than IE9)
  - Firefox - current, and current - 1
  - Safari - current, and current - 1

---

## License

[MIT](LICENSE.md)

[Contribute]: CONTRIBUTING.md
[plugins]: PLUGINS.md
[ReactJS]: https://facebook.github.io/react/
[Siren]: https://github.com/kevinswiber/siren
[Siren+lux]: SIREN+LUX.md

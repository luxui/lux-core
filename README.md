**NOTE: This project is still in heavy development and is not ready for actual
use at this time. Releasing to the open source community is aimed at getting
feedback and help from the community.**

---

Luxui
=====

Luxui is a [Siren][Siren] (hypermedia) client which presents a web application
UI for RESTful API resource representations. Luxui only has logic to build
pages from API resource representations and nothing more; this allows for, or
enforces, that all application control is in the domain of the API; including:
workflow, access control, field display and type, etc.

Specifically Luxui adheres to [Siren+lux] as a standard for API resource
representations; this attempts to reduce ambiguity and inconsistency between
API implementations.

## Installation

Install Luxui as a dependency in your project:

```
$ npm install --save @luxui/luxReact
```

## Usage

Projects using Luxui must provide two configuration options: an API root URI
(`apiRoot`) and a location to render the application to (`renderRoot`). The API
root URI should be an absolute URI to the root resource of the API "backing"
the application. The render location should be a `id` of a DOM resource that
the implementation code will be able to "own" for application rendering.

Then you will be able to use Luxui in your application(s):

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
browse the open Pull Requests and issues for ideas on where to focus.

---

## Project Goals

The primary use-case for Luxui is APIs which also need to make available a UI
for people to use only as a functional application and not as a broad solution
for web applications or marketing sites. This could eventually change as the
project becomes more mature and the idea is proven to be valid.

### A Standard UI/Application

The problems that Luxui is attempting to solve for are:

  1. Creating a reason for our APIs to become standardized in response format.
  2. Give non-UI developers control of the UI in a familiar way.
  3. Enable UI developers to build more general purpose components within a
      framework rather than single-use UI elements.
  4. Working towards a consistent UX across many applications.
  5. Make moving between projects a consistent experience.
  6. Create a way to distribute interesting, helpful, and necessary
      updates to internal many applications in a more consistent, scheduled,
      repeatable, and safe fashion.

### No Shared Knowledge

Shared knowledge is a crippling hinderance to the independent evolution, or
iteration, of API (back-end) and UI (front-end). With shared knowledge between
API and UI any update or added feature requires that both be retested and
redeployed. This coupling introduces risk, unless automated testing is
exhaustive and maintained indefinitely. Testing must also be thorough in
exercising edge-cases; which are inherently and increasingly difficult to find
as an application grows in features.

One example of "shared knowledge" is, an API provides a unique identifier for a
resource and the application "knows" how to construct the URL to that resource
based on the unique identifier. This scenario effectively locks the URLs
in-place and doesn't allow for the endpoints in an API to change over time;
which then prevents the API from evolving over time to fit the changing needs
of the domain.

An API should abstract domain knowledge to encourage external integration so
that many systems can leverage the abstractions in new and novel ways to solve
for business needs. Building an API for only one specific UI limits the ability
for an API to be useful to many *different* clients.

Luxui attempts to have **no "shared knowledge"** between API and UI. All
knowledge should be encoded into the API resource representations in some way.

### RESTful resources

All resources supplied by the API will fall into one of two categories:
collection or item.

#### Collections

A collection is simply a list of like things; e.g. all items in the
`/applications` collection are themselves individual applications. An analogy
to a DB would be a table.

#### Items

An item is a single thing that is a domain concept; e.g. an application could
be found at `/applications/1234`. Using the DB analogy, an item would be
analogous to a record in a table; including its related data

---

## License

[MIT](LICENSE.md)

[Contribute]: CONTRIBUTING.md
[ReactJS]: https://facebook.github.io/react/
[Siren]: https://github.com/kevinswiber/siren
[Siren+lux]: SIREN+LUX.md

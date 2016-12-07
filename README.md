LuxUI
=====

Lux is a hypermedia client for generating UIs from API responses. Lux relies completely on the API responses for building the user experience and application. API responses are expected to adhere to [Siren+lux](SIREN+LUX), a subset of the [Siren] hypermedia specification.

Lux provides for [customization](#lux-customization) per application in:

  - [Non-resource-backed pages](#nonresourcebacked-pages),
  - Customizable [Field display components](#field-display-components), and
  - (coming soon) [Layout injection](template-injection).

Lux expects RESTful resources to follow a common pattern of [collections](#collections) and [items](#items).

---

## Getting Started

The module `@luxui/core` exports the following:

  - `lux` {function} (default export) - Handle the initial configuration and subsequent page rendering calls.
  - `apiRequest` {function} - Wrapper function for `fetch` with:
    + `JSON.stringify` values in `option.body`.
    + If a session token is stored in `authToken` will be included in `authorization` header of request.
    + Will return a consistent `ResponseModel`.
  - `luxPath` {function} - Utility function for parsing a string (window.location typically) to extract the `pathname` and `search` properties in a consistent manner.
  - `routing` {function} - Allow for registering additional routing matchers and handlers.
  - `storage` {function} - Access to data Lux is storing:
    + Initially nothing.
    + Login uses `authToken` for storing a session token and will be included in `authorization` header of API requests.

### Initialization

Projects using Lux must provide a API root URI; this should be an absolute URI to the root resource of the API "backing" the application.

  1. `api` - The API root URI. REQUIRED.
  2. [Customize](lux-customization). Optional.

```
import lux from '@luxui/core';

// a minimum implementation
lux({ api: 'http://api.root' });
```

### Authentication TODO: tutorial

Applications with resources "behind" a session login will need to create a custom login page and handler. The handler will need to store session information in the localStorage key `authToken`. The value in `authToken` will be passed in the `authentication` header of subsequent API requests until a `403` response if returned and then a second request without the `authentication` header included succeeds.

---

## Lux Customization

Lux provides limited customization options; but those customizations are in critical areas which will allow for necessary flexibility.

### Non-resource-backed pages

Pages in an application which are purely content and aren't a resources in the API are considered to be "non-resource-backed". These pages have content that is solely provided by the application and not the API. Some examples would be:

  - a login page; not all applications will have authentication
  - informational page(s), such as an "about us" page

These pages will retrieve the root resource of the API for cross-cutting concerns: main menu links, logged in status, etc.

### Template Injection

TBD

### Field Display Components

TBD

---

## Shared Knowledge

Shared knowledge is a crippling hinderance to the evolution, or iteration, of API (back-end) and/or UI (front-end). With shared knowledge between API and UI any update or added feature requires that both be retested and redeployed. This coupling introduces risk, unless automated testing is exhaustive and maintained indefinitely. Testing must also be thorough in exercising edge-cases; which are inherently and increasingly difficult to find as an application grows in features.

One example of "shared knowledge" is, an API provides a unique identifier for a resource and the application "knows" how to construct the URL to that resource based on the unique identifier. This scenario effectively locks the URLs in-place and doesn't allow for the endpoints in an API to change over time; which then prevents the API from evolving over time to fit the changing needs of the domain.

An API should abstract domain knowledge to encourage external integration so that many systems can leverage the abstractions in new and novel ways to solve for business needs. Building an API for only one specific UI limits the ability for an API to be useful to many *different* clients.

lux attempts to have **no "shared knowledge"** between API and UI. All knowledge should be encoded into the API responses in some way.

---

## RESTful resources

All resources supplied by the API will fall into one of two categories: collection or item. The one resource that doesn't comply with this is the root resource which is neither a collection nor an item.

### Collections

A collection is simply a list of like things; e.g. all items in the `/applications` collection are themselves individual applications. An analogy to a DB would be a table.

### Items

An item is a single thing that is a domain concept; e.g. an application could be found at `/applications/1234`. Using the DB analogy, an item would be analogous to a record in a table; including its related data.


[ReactJS]: https://facebook.github.io/react/
[Siren]: https://github.com/kevinswiber/siren

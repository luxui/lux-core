API Implementation Guide
========================

This is an attempt at a practical step-by-step "how to" guide for creating an
API that implements the features expected by Luxui. This guide will focus on
what the API responses should look like and not how to produce the responses as
that is well beyond the scope of Luxui.

## Table of Contents
<!--
  Use this list as indication of what topics to cover; items should only be
  linked to their sections as indication that it is complete.
-->
  1. [Root resource](#root-resource)
  2. Menu links
    + Collections
    + Items
    + Nested menu links ("sub-section")
  3. Form layout
    + View-only
    + Edit
  4. Field components
    + Default
    + Custom - via plug-ins
    + Validation
  5. Breadcrumbs
  6. Workflow
    + Return to parent
  7. New items
  8. Collection pagination ("chapter")

*NOTE: All of the examples below are going to assume that the appropriate media
type `application/vnd.siren+json` is being requested in the header value of the
request but is omitted for brevity. This is handled by Luxui by default.*

## Root Resource

Any RESTful API should have at least one resource `/`. This is the entry-point
to all of the other endpoints. This resource will always be available and
return information about what additional actions can be performed or links that
can be followed.

Luxui will be expecting a few things. The first is that the appropriate media
type - `application/vnd.siren+json` - is being used. The only other thing that
is required is that it includes a `links` property.

**GET** `http://foo.bar`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index", "self"],
      "title": "Foo Bar"
    }
  ]
}
```

Since `href` and `title` are pretty much self-explanatory we'll skip those and
explain more about the values in the `rel` array.

The "index" value indicates that the link is the "root resource" of the API.
Spoiler alert, this link will be included in ALL representations returned from
the API and it will always include that value "index"; because it will always
be the "root resource".

Now the "self" value simply means that the link is the same as the outer
resource. This value will migrate around once we have additional resources in
the API - and are viewing those - and will always indicate the current resource
representation. We'll see more of this value as we go through this guide.

This is all that is necessary from the root resource for Luxui to be able to
render a page. Albeit that with this as the API response not much else is going
to be available.

Next let's add some other links so that a user can navigate around a little.

## Menu links

Many sites will provide a list of links as a "main menu", so let's do that next
so that the application will allow a user to navigate around. To do this we
only need to provide some additional links with some specific link relations.

**GET** `http://foo.bar`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index", "self"],
      "title": "Foo Bar"
    },
    {
      "href": "http://foo.bar/about",
      "rel": ["section"],
      "title": "About"
    }
  ]
}
```

After making changes to the API and making the request to the API once again we
see that we are given another link. Now if we "follow" that link in the app we
will get a new representation.

**GET** `http://foo.bar/about`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index"],
      "title": "Foo Bar"
    },
    {
      "href": "http://foo.bar/about",
      "rel": ["section", "self"],
      "title": "About"
    }
  ]
}
```

lux UI Roadmap
==============

  1. [ ] Open Sourced - available on public GitHub as a project usable by people
      outside of QL
  2. [ ] Reused - in production (or planned on being deployed to production) by
      another project than Phony
  3. [ ] Modular - core library will render a simple page but most other
      functionality is "Plugged in" (configured per application)
  4. [ ] Consumed - Phony refactored to consume lux as an external dependency
  5. [ ] [Stand-alone](#stand-alone) - decoupled from Phony and reusable

## stand-alone

As a part of making lux "stand-alone" some refactoring will be completed to
achieve: better consistency in implementations of features, clarity for future
collaborators in editing code, improved testability of components for framework
reliability in the long-term. Stateless-ness will be coupled with use of Redux
for handling state.

import formModel from './formModel';

describe('Rest.Item', function () {
  it('should exist; and should be a function', function () {
    expect(typeof formModel).toBe('function');
  });

  describe('formModel', function () {
    let props;

    beforeEach(function () {
      props = {
        actions: [
          {
            fields: [
              {
                name: 'movies',
                type: 'text', // closest (fallback) HTML5 form element type
                value: 'Movies',
              }
            ],
            href: 'http://foo.bar/item/2',
            name: 'view',
          }
        ],
        entities: [
          {
            actions: [
              {
                class: ['lookup'], // (current) options: list, and lookup
                href: 'http://foo.bar/movies',
                method: 'GET',
                name: 'lookup',
                title: ''
              }
            ],
            class: ['fieldConfig'],
            // NOTE: #Siren-consideration - either, one the other of, entities
            // or links are/is required; not both. Values provided are a "pre-
            // cached" value and should prevent remote call.
            entities: [
              'options',
              'not',
              'needing',
              'retrieval',
            ],
            properties: {
              movies: {
                format: {
                  // JSONSchema? - corresponding with field.type - in addition to
                  // component type configuration; not part of it.
                },
                // component options
                options: ['sort', 'append', 'remove', 'filter'],
              }
            }
          }
        ],
        properties: {},
        title: 'Foo Bar',
      };
    });

    it('should throw an error if no args provided', function () {
      expect(function () {
        formModel();
      }).toThrow('No arguments passed to `formModel`.');
    });

    it('should throw an error if no `actions` provided', function () {
      expect(function () {
        formModel({});
      }).toThrow('No `actions` provided; "view-item" action is required.');
    });

    it('should throw an error if no "view" action provided', function () {
      expect(function () {
        formModel({ actions: [
          {
            name: 'something-weird'
          }
        ] });
      }).toThrow('View action not provided; which would include fields[].');
    });

    it('should throw an error if no "schema" is found in "view" action', function () {
      expect(function () {
        formModel({
          actions: [
            {
              name: 'view-item'
            }
          ]
        });
      }).toThrow('No schema found.');
    });

    it('should return an empty `properties` object for "new" resources', function () {
      props.actions[0].href = props.path = 'http://foo.bar/new';

      expect(formModel(props).properties).toEqual({});
    });

    it('should configure fields in formModel.schema', function () {
      const schema = [
        {
          ...props.actions[0].fields[0],
          config: {
            actions: [
              {
                class: [
                  'lookup',
                ],
                href: 'http://foo.bar/movies',
                method: 'GET',
                name: 'lookup',
                title: '',
              },
            ],
            entities: [
              'options',
              'not',
              'needing',
              'retrieval',
            ],
            format: {},
            options: [
              'sort',
              'append',
              'remove',
              'filter',
            ],
          },
        }
      ];

      expect(formModel(props).schema).toEqual(schema);
    });

    it('should work fine without entities collection', function () {
      delete props.entities;

      expect(formModel(props)).toEqual({
        properties: {},
        schema: [
          {
            config: undefined,
            name: 'movies',
            type: 'text',
            value: 'Movies',
          },
        ],
        title: 'Foo Bar',
        view: {
          fields: [
            {
              name: 'movies',
              type: 'text',
              value: 'Movies',
            },
          ],
          href: 'http://foo.bar/item/2',
          name: 'view',
        },
      });
    });
  });
});

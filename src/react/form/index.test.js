import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './index';

const FormComponent = registry('Form');

describe('FormComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof FormComponent).toBe('function');
  });
});

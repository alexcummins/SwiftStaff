/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Spinner Should be enable initially', () => {
  const app = new App();
  expect(app.state.spinnerEnable).toBe(true);
});

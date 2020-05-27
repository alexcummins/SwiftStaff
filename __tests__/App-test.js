/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Spinner should be enabled initially', () => {
  const app = new App();
  expect(app.state.spinnerEnable).toBe(true);
});


it('Spinner should disable when both username and password are not empty', () => {
  const app = new App();

  app.state.userName = "Test";
  app.setSpinner(true); // If we can set state while testing we can avoid this
  expect(app.state.spinnerEnable).toBe(true);
  app.state.password = "Test";
  app.setSpinner(true);
  expect(app.state.spinnerEnable).toBe(false);
  app.state.userName = "";
  app.setSpinner(true);
  expect(app.state.spinnerEnable).toBe(true);
  app.state.userName = "Test";
  app.setSpinner(true);
  expect(app.state.spinnerEnable).toBe(false);
  app.state.password = "";
  app.setSpinner(true);
  expect(app.state.spinnerEnable).toBe(true);

});

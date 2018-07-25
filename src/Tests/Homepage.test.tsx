import React from "react";
import { Homepage } from "./../Components/Homepage/Homepage";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Homepage />).toJSON();
  expect(rendered).toBeTruthy();
});

import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainHeader from "./MainHeader";

configure({ adapter: new Adapter() });

describe("MainHeader", () => {
  it("Renderiza un componente <header />", () => {
    const wrapper = shallow(<MainHeader />);
    expect(wrapper.find('header'));
  });
});

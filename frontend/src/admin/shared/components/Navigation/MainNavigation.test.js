import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainNavigation from "./MainNavigation";
import MainHeader from "./MainHeader";

configure({ adapter: new Adapter() });

describe("MainNavigation", () => {
  it("Renderiza el componente <MainHeader />", () => {
    const wrapper = shallow(<MainNavigation />);
    expect(wrapper.find(MainHeader));
  });
});

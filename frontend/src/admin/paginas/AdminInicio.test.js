import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AdminInicio from "./AdminInicio";
import Card from "../shared/components/UIElements/Card";

configure({ adapter: new Adapter() });

describe("AlumnasInicio", () => {
  it("Renderiza dos componentes <Card />", () => {
    const wrapper = shallow(<AdminInicio />);
    expect(wrapper.find(Card)).toHaveLength(2);
  });
});
import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AlumnasInicio from "./AlumnasInicio";
import Card from "../../admin/shared/components/UIElements/Card"

configure({ adapter: new Adapter() });

describe("AlumnasInicio", () => {
  it("Renderiza el componente <Card />", () => {
    const wrapper = shallow(<AlumnasInicio />);
    expect(wrapper.find(Card));
  });
});

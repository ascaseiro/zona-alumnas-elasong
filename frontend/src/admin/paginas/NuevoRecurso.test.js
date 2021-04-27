import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NuevoRecurso from "./NuevoRecurso";
import Card from "../shared/components/UIElements/Card";

configure({ adapter: new Adapter() });

describe("NuevoRecurso", () => {
  it("Renderiza el componente <Card />", () => {
    const wrapper = shallow(<NuevoRecurso />);
    expect(wrapper.find(Card));
  });
});

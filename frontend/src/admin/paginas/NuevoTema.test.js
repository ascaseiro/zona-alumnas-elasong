import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NuevoTema from "./NuevoTema";
import Card from "../shared/components/UIElements/Card";

configure({ adapter: new Adapter() });

describe("NuevoTema", () => {
  it("Renderiza el componente <Card />", () => {
    const wrapper = shallow(<NuevoTema />);
    expect(wrapper.find(Card));
  });
});

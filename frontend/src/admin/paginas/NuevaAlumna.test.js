import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NuevaAlumna from "./NuevaAlumna";
import Alumna from "../componentes/Alumna";

configure({ adapter: new Adapter() });

describe("NuevaAlumna", () => {
  it("Renderiza el componente <Card />", () => {
    const wrapper = shallow(<NuevaAlumna />);
    expect(wrapper.find(Alumna));
  });
});

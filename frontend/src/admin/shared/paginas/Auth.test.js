import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Auth from "./Auth";
import Card from "../components/UIElements/Card";
import ErrorModal from "../components/UIElements/ErrorModal";

configure({ adapter: new Adapter() });

describe("Auth", () => {
  it("Renderiza el componente <Card />", () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper.find(Card));
  });

  it("Renderiza el componente <ErrorModal />", () => {
    const wrapper = shallow(<Auth error/>);
    expect(wrapper.find(ErrorModal));
  });
});

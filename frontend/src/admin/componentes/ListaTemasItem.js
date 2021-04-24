import React from "react";
import { Link } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import "./ListaTemasItem.css";

const ListaTemasItem = (props) => {
  return (
    <li className="tema-item">
      <Card className="tema-item__contenido">
        <Link to={`/temas/${props.id}/modificar-tema`}>
          <div className="tema-item__info">
            <h2>{props.name}</h2>
            <h3>{props.compositor}</h3>
            <h3>{props.año}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default ListaTemasItem;

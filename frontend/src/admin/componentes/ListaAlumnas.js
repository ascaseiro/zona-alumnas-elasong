import React from "react";

import Card from "../shared/components/UIElements/Card";
import ListaAlumnasItem from "./ListaAlumnasItem";
import "./ListaAlumnas.css";

const ListaAlumnas = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No hay alumnas guardadas</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="alumnas-list">
      {props.items.map((alumna) => {
        return (
          <ListaAlumnasItem
            key={alumna.id}
            id={alumna.id}
            name={alumna.name}
            imagen={alumna.imagen}
            cuerda={alumna.cuerda}
            onDelete={props.onDeleteAlumna}
          />
        );
      })}
    </ul>
  );
};

export default ListaAlumnas;

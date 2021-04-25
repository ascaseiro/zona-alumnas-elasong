import React from "react";

import Card from "../shared/components/UIElements/Card";
import ListaTemasItem from "./ListaTemasItem";
import "./ListaTemas.css";

const ListaTemas = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No hay temas guardados</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="temas-list">
      {props.items.map((tema) => {
        return (
          <ListaTemasItem
            key={tema.id}
            id={tema.id}
            name={tema.name}
            compositor={tema.compositor}
            año={tema.año}
            onDelete={props.onDeleteTema}
          />
        );
      })}
    </ul>
  );
};

export default ListaTemas;

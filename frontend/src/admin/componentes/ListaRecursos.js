import React from "react";

import Card from "../shared/components/UIElements/Card";
import ListaRecursosItem from "./ListaRecursosItem";
import "./ListaRecursos.css";

const ListaRecursos= (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No hay recursos guardadas</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="recursos-list">
      {props.items.map((recurso) => {
        return (
          <ListaRecursosItem
            key={recurso.id}
            id={recurso.id}
            temaId={recurso.temaId}
            name={recurso.name}
            cuerda={recurso.cuerda}
            imagen={recurso.imagen}
            onDelete={props.onDeleteRecurso}
          />
        );
      })}
    </ul>
  );
};

export default ListaRecursos;

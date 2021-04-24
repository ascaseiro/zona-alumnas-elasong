import React from "react";
import { useParams } from "react-router-dom";

import Card from '../shared/components/UIElements/Card'
import './AdminModificarTema.css'

const DUMMY_TEMAS = [
  { id: "u1", name: "CREEP", compositor:"Radiohead", año: "1998" },
  { id: "u2", name: "GIMME", compositor:"Abba", año: "1969" },
  { id: "u3", name: "HOUSE OF THE RISSING SUN", compositor:"The Animals", año: "1968" }
];

const ModificarTema = () => {
  const temaId = useParams().temaId;
  const temaGuardado = DUMMY_TEMAS.filter((tema) => tema.id === temaId);
  return (
    <div>
      {temaGuardado.map((tema) => {
        return (
          <Card className="form-control">
            <input type="text" placeholder={tema.name}></input>
            <input type="text" placeholder={tema.compositor}></input>
            <input type="email" placeholder={tema.año}></input>
            <input type="submit" value="Submit" className="button"></input>
          </Card>
        );
      })}
    </div>
  );
};

export default ModificarTema;

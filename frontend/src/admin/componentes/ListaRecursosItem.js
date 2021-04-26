import React from "react";

import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import Avatar from "../shared/components/UIElements/Avatar";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import "./ListaRecursosItem.css";

const ListaRecursosItem = (props) => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();

  const confirmarBorrarHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/temas/${props.temaId}/modificar-recurso/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="recurso-item">
        <Card className="recurso-item__contenido">
          {cargando && <LoadingSpinner asOverlay />}
          <a href={`http://localhost:5000/${props.imagen}`}>
          <div className="recurso-item__imagen">
              <Avatar alt={props.name} imagen={`http://localhost:5000/${props.imagen}`} />
            </div>
            <div className="recurso-item__info">
              <h2>{props.name}</h2>
              <h3>{props.cuerda}</h3>
            </div>
          </a>
          <Button onClick={confirmarBorrarHandler}>Borrar</Button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListaRecursosItem;

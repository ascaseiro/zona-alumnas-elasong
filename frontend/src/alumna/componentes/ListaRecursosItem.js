import React from "react";

import Card from "../../admin/shared/components/UIElements/Card";
import Avatar from "../../admin/shared/components/UIElements/Avatar";
import ErrorModal from "../../admin/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../admin/shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const ListaRecursosItem = (props) => {
  const { cargando, error, clearError } = useHttpClient();

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
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListaRecursosItem;

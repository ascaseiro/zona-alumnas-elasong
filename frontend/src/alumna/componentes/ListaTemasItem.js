import React from "react";
import { Link } from "react-router-dom";

import Card from "../../admin/shared/components/UIElements/Card";
import Button from "../../admin/shared/components/FormElements/Button";
import ErrorModal from "../../admin/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../admin/shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const ListaTemasItem = (props) => {
  const { cargando, error, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="tema-item">
        <Card className="tema-item__contenido">
          {cargando && <LoadingSpinner asOverlay />}
          <Link>
            <div className="tema-item__info">
              <h2>{props.name}</h2>
              <h3>{props.compositor}</h3>
              <h3>{props.año}</h3>
            </div>
          </Link>
          <Button to={props.id+"/recursos"} succes><h2>Partituras</h2></Button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListaTemasItem;

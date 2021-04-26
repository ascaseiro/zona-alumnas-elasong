import React from "react";
import { Link } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import "./ListaTemasItem.css";

const ListaTemasItem = (props) => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();

  const confirmarBorrarHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/temas/${props.id}/modificar-tema`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="tema-item">
        <Card className="tema-item__contenido">
          {cargando && <LoadingSpinner asOverlay />}
          <Link to={`/temas/${props.id}/modificar-tema`}>
            <div className="tema-item__info">
              <h2>{props.name}</h2>
              <h3>{props.compositor}</h3>
              <h3>{props.año}</h3>
            </div>
          </Link>
          <Button onClick={confirmarBorrarHandler} inverse>Borrar</Button>
          <Button to={props.id+"/recursos"}><h2>Partituras</h2></Button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListaTemasItem;

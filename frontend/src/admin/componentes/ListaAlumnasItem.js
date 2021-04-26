import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../shared/components/UIElements/Avatar";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import "./ListaAlumnasItem.css";

const ListaAlumnasItem = (props) => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();

  const confirmarBorrarHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/alumnas/${props.id}/modificar-alumna`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="alumna-item">
        <Card className="alumna-item__contenido">
          {cargando && <LoadingSpinner asOverlay />}
          <Link to={`/alumnas/${props.id}/modificar-alumna`}>
            <div className="alumna-item__imagen">
              <Avatar
                alt={props.name}
                imagen={`http://localhost:5000/${props.imagen}`}
              />
            </div>
            <div className="alumna-item__info">
              <h2>{`${props.name} ${props.apellidos}`}</h2>
              <h3>{props.cuerda}</h3>
            </div>
          </Link>
          <div className="center" style={{marginRight: '0'}}>
            <Button onClick={confirmarBorrarHandler}>Borrar</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListaAlumnasItem;

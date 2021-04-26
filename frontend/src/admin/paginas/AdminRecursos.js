import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListaRecursos from "../componentes/ListaRecursos";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Button from '../shared/components/FormElements/Button'
import { useHttpClient } from "../../hooks/http-hook";

const AdminRecursos = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [RecursosCargados, setRecursosCargados] = useState();
  const temaId = useParams().temaId;

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/admin/temas/${temaId}/modificar-recurso`
        );

        setRecursosCargados(responseData.recursos);
      } catch (err) {}
    };
    fetchRecursos();
  }, [sendRequest, temaId]);

  const errorHandler = () => {
    clearError();
  };

  const recursoBorradoHandler = (recursoBorradoId) => {
    setRecursosCargados((recursosPrev) =>
      recursosPrev.filter((recurso) => recurso.id !== recursoBorradoId)
    );
  };

  return (
    <React.Fragment>
      <Button to={"/temas/" + temaId + "/nuevo-recurso"}>Añadir nuevo recurso</Button>

      <ErrorModal error={error} onClear={errorHandler} />
      {cargando && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!cargando && RecursosCargados && (
        <ListaRecursos
          items={RecursosCargados}
          onDeleteRecurso={recursoBorradoHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AdminRecursos;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListaRecursos from "../componentes/ListaRecursos";
import ErrorModal from "../../admin/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../admin/shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const AlumnaRecursos = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [RecursosCargados, setRecursosCargados] = useState();
  const temaId = useParams().temaId;

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const responseData = await sendRequest(
          `backend:5000/admin/temas/${temaId}/modificar-recurso`
        );

        setRecursosCargados(responseData.recursos);
      } catch (err) {}
    };
    fetchRecursos();
  }, [sendRequest, temaId]);

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {cargando && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!cargando && RecursosCargados && (
        <ListaRecursos
          items={RecursosCargados}
        />
      )}
    </React.Fragment>
  );
};

export default AlumnaRecursos;

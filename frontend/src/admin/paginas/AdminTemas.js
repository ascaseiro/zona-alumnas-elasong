import React, { useEffect, useState } from "react";

import ListaTemas from '../componentes/ListaTemas'
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../hooks/http-hook";

const AdminTemas = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [TemasCargados, setTemasCargados] = useState();

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/admin/temas"
        );

        setTemasCargados(responseData.temas);
      } catch (err) {}
    };
    fetchTemas();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };

  const temaBorradoHandler = (temaBorradoId) => {
    setTemasCargados((temasPrev) =>
      temasPrev.filter((tema) => tema.id !== temaBorradoId)
    );
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {cargando && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!cargando && TemasCargados && <ListaTemas items={TemasCargados} onDeleteTema={temaBorradoHandler}/>}
    </React.Fragment>
  );
};

export default AdminTemas;
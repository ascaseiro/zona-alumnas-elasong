import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./AdminModificarTema.css";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ModificarTema = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const [temaCargado, setTemaCargado] = useState();
  const temaId = useParams().temaId;
  const navegacion = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      compositor: {
        value: "",
        isValid: false,
      },
      año: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const fetchTema = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/admin/temas/${temaId}/modificar-tema`
        );
        setTemaCargado(responseData.tema);
        setFormData(
          {
            name: {
              value: responseData.tema.name,
              isValid: true,
            },
            compositor: {
              value: responseData.tema.compositor,
              isValid: true,
            },
            año: {
              value: responseData.tema.año,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchTema();
  }, [sendRequest, temaId, setFormData]);

  const modificarTemaSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/admin/temas/${temaId}/modificar-tema`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          compositor: formState.inputs.compositor.value,
          año: formState.inputs.año.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navegacion.push("/temas");
    } catch (err) {}
  };

  if (cargando) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!temaCargado && !error) {
    return (
      <div className="center">
        <Card>
          <h2>No se ha podido encontrar este tema</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!cargando && temaCargado && (
        <form className="form-control" onSubmit={modificarTemaSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Título"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un título"
            onInput={inputHandler}
            initialValue={temaCargado.name}
            initialValid={true}
          />
          <Input
            id="compositor"
            element="input"
            type="text"
            label="Compositor"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un compositor"
            onInput={inputHandler}
            initialValue={temaCargado.compositor}
            initialValid={true}
          />
          <Input
            id="año"
            element="input"
            type="text"
            label="Año de composición"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un año"
            onInput={inputHandler}
            initialValue={temaCargado.año}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Aceptar
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default ModificarTema;

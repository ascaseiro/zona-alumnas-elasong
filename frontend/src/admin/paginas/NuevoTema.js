import React from "react";
import { useHistory } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../shared/utils/validators";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";

const NuevoTema = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
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

  const navegacion = useHistory();

  const temaSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://206.189.105.11:5000/admin/nuevo-tema",
        "POST",
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

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="form-control">
        {cargando && <LoadingSpinner asOverlay />}
        <h2>Introduce los datos del nuevo tema</h2>
        <hr />
        <form onSubmit={temaSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            placeholder="Nombre del tema"
            errorText="Por favor, introduce un nombre"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="compositor"
            element="input"
            type="text"
            placeholder="Compositor del tema"
            errorText="Por favor, introduce un compositor "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <Input
            id="año"
            element="input"
            type="text"
            placeholder="Año de composición"
            errorText="Por favor, introduce un año de composición"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <div className="center">
            <Button type="submit" inverse>
              Aceptar
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default NuevoTema;

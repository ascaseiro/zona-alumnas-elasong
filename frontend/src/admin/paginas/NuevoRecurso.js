import React, { useCallback, useReducer } from "react";
import { useParams, useHistory } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../shared/components/FormElements/ImageUpload";
import { VALIDATOR_REQUIRE } from "../shared/utils/validators";
import { useHttpClient } from "../../hooks/http-hook";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NuevoRecurso = () => {
  const { cargando, error, sendRequest, clearError } = useHttpClient();
  const temaId = useParams().temaId;

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      cuerda: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const navegacion = useHistory();

  const recursoSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("cuerda", formState.inputs.cuerda.value);
      formData.append("imagen", formState.inputs.imagen.value);

      await sendRequest(
        `http://206.189.105.11:5000/admin/temas/${temaId}/nuevo-recurso`,
        "POST",
        formData
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
        <h2>Introduce los datos del nuevo recurso</h2>
        <hr />
        <form onSubmit={recursoSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            placeholder="Nombre del recurso"
            errorText="Por favor, introduce un nombre"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <ImageUpload center id="imagen" onInput={inputHandler} />
          <Input
            id="cuerda"
            element="input"
            type="text"
            placeholder="Cuerda"
            errorText="Por favor, introduce una cuerda"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          ></Input>
          <div className="center">
            <Button type="submit" inverse disabled={!formState.isValid}>
              Aceptar
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default NuevoRecurso;

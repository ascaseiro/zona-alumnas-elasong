import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [imagen, setImagen] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const selectorImagenRef = useRef();

  useEffect(() => {
    if (!imagen) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () =>{
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(imagen)
  }, [imagen]);

  const elegirHandler = (event) => {
    let imagenElegida;
    let imagenIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      imagenElegida = event.target.files[0];
      setImagen(imagenElegida);
      setIsValid(true);
      imagenIsValid = true;
    } else {
      setIsValid(false);
      imagenIsValid = false;
    }
    props.onInput(props.id, imagenElegida, imagenIsValid);
  };

  const elegirImagenHandler = () => {
    selectorImagenRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={selectorImagenRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={elegirHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Por favor, selecciona una imagen</p>}
        </div>
        <Button type="button" onClick={elegirImagenHandler}>
          Elegir imagen
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

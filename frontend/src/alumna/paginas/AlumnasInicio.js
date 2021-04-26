import React from "react";
import { Link } from "react-router-dom";

const AlumnasTemas = () => {
  return (
    <ul className="inicio-list">
      <li className="inicio-item">
        <div className="inicio-item__contenido test" style={{padding: "0"}}>
          <Link to={`user/temas`}>Temas</Link>
        </div>
      </li>
    </ul>
  );
};

export default AlumnasTemas;

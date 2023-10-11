import { NavLink } from "react-router-dom";
import bandera from "../../assets/logos/logo.jpg";

import "./style.css";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/">
        <img src={bandera} alt="" className="nav__logo" />
      </NavLink>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav__item--active" : undefined
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/send-peticion"
            className={({ isActive }) =>
              isActive ? "nav__item--active" : undefined
            }
          >
            Redactar PQRSF
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/search-peticion"
            className={({ isActive }) =>
              isActive ? "nav__item--active" : undefined
            }
          >
            Consultar PQRSF
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };

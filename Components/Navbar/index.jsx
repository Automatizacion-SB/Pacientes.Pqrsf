import { NavLink } from "react-router-dom";

import "./style.css";

function Navbar() {
  return (
    <nav className="nav">
      <img
        src="https://www.svgrepo.com/show/532033/cloud.svg"
        alt=""
        className="nav__logo"
      />
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

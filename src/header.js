import h from "./header.module.css";
import logo from "./images/OJJO.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faMagnifyingGlass, faBurger } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from "react";

let Loop = ()=>{
	return (
		<>
		<FontAwesomeIcon icon={faMagnifyingGlass}/>
		пошук 
		</>
  );
}

let Ul = ()=>{
	return (
    <ul className={h.user_ul}>
      <li>
        <Loop/>
      </li>
      <li>Вход/Регистрация</li>
      <li>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faCartShopping} />
      </li>
    </ul>
  );
}
let Pages = ()=>{
	return (
    <ul className={h.pages}>
      <li>Контрагентам</li>
      <li>Дизайнерам</li>
      <li>Вакансии</li>
    </ul>
  );
}

export default function Header() {
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
	let [burger, setBurger] = useState(window.innerWidth < 700 ? true : false)
	window.addEventListener('resize', ()=> window.innerWidth < 700 ?  setBurger(true) : setBurger(false))
  return (
    <header>
      <div className={h.wraper}>
        {!burger ? <Pages /> : false}
        <img src={logo} alt="logo" />
        {!burger ? (
          <Ul />
        ) : (
          <div className={h.burger}>
            <FontAwesomeIcon icon={faBurger} onClick={handleShow} />
            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Ul />
                <Pages />
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        )}
      </div>
    </header>
  );
}

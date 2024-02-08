import h from "./header.module.css";
import logo from "./images/OJJO.svg";
import loop from "./images/loop.svg";
import heart_icon from "./images/heart-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faMagnifyingGlass, faBurger } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
let Ul = ()=>{
	return (
    <ul className={h.user_ul}>
      <li>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Поиск
      </li>
      <li>Вход/Регистрация</li>
      <li>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faCartShopping} />
      </li>
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
        <ul className={h.pages}>
          <li>Контрагентам</li>
          <li>Дизайнерам</li>
          <li>Вакансии</li>
        </ul>
        <img src={logo} alt="logo" />
        {!burger ? <Ul/> : <div className={h.burger}>
        <FontAwesomeIcon icon={faBurger} onClick={handleShow} />
				<Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
					</div>}
      </div>
    </header>
  );
}

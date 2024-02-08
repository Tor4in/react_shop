import "./App.css";
import Cart from "./cart";
import Header from "./header";
import React, { useState } from "react";
import jsonData from "./data.json";
import "./cart.css";
import c from "./cart.module.css";
import "react-range-slider-input/dist/style.css";
import Slider from "react-slider";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
let data = []
jsonData.forEach(e => {
	data.push(e)
});
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
export default function App() {
  let [values, setValues] = useState([0, 3000]);
	let [category, setCategory] = useState({
		"brand": "Бренд",
		"price": values,
		"who": "Для кого",
		"sort": "Най популярніші" 
	})
	let sortData = () =>{
		let newData = []
		data.forEach(e => {
			if(category.brand === 'Бренд' && parseInt(e.price) >= category.price[0] && parseInt(e.price) <= category.price[1]){
				newData.push(e)
			}else if(category.brand === e.brand && parseInt(e.price) >= category.price[0] && parseInt(e.price) <= category.price[1]) newData.push(e)
		});
		return newData
	}
	let change = (cace, to)=>{
		switch (cace){
			case "b":
				setCategory({...category, "brand": to})
				break;
			case "p":
				setCategory({...category, "price": values})
				break;
			case "w":
				setCategory({...category, "who": to})
				break;
			case "s":
				setCategory({...category, "sort": to})
				break;
			case "drop": 
			setCategory({...category, "price": [0, 3000]})
				break;
				default: 

		}
	}
  return (
    <>
      <Header />
      <div className={c.category}>
        <DropdownButton
          key="down-centered_brand"
          id={`dropdown-button-drop-down-centered`}
          drop="down-centered"
          variant="secondary"
          title={category.brand}
        >
          <Dropdown.Item eventKey="1" onClick={()=>change("b","Dolce & Gabanna")}>
            Dolce & Gabanna
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={()=>change("b","Gucce")}>
            Gucce
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={()=>change("b","Nike")}>
            Nike
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={()=>change("b","Бренд")}>
            Очистити
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          key="down-centered_range"
          id={`dropdown-button-drop-down-centered2`}
          drop="down-centered"
          variant="secondary"
          title={`Ціна  $${values[0]} - $${values[1]}`}
        >
         <Dropdown.ItemText><Slider
              className="slider"
              value={values}
              min={0}
              max={3000}
							onChange={setValues}
              onAfterChange={()=>{change("p")}}
            /></Dropdown.ItemText>
						<Dropdown.Item onClick={()=>{setValues([0, 3000]); change("drop")} }>
								Скинути
          </Dropdown.Item>
        </DropdownButton>
				<DropdownButton
          key="down-centered_who"
          id={`dropdown-button-drop-down-centered`}
          drop="down-centered"
          variant="secondary"
          title={category.who}
        >
          <Dropdown.Item eventKey="1" onClick={()=> {change("w", "Чоловік")}}>
            Чоловік
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={()=>{ change("w", "Жінка")}}>
            Жінка
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={()=>{ change("w", "Дитина")}}>
            Дитина
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={()=> {change("w", "Підліток")}}>
            Підліток
          </Dropdown.Item>
					<Dropdown.Item eventKey="5" onClick={()=> {change("w", "Для кого")}}>
            Очистити
          </Dropdown.Item>
        </DropdownButton>
				<DropdownButton
          key="down-centered_sort"
          id={`dropdown-button-drop-down-centered`}
          drop="down-centered"
          variant="secondary"
          title={category.sort}
        >
          <Dropdown.Item eventKey="1" onClick={()=>change("s", "Спочатку дешевші")}>
            Спочатку дешевші
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={()=>change("s", "Спочатку дорожчі")}>
					Спочатку дорожчі
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={()=>change("s", "Най популярніші")}>
            Най популярніші
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={()=>change("s", "Най новіші")}>
            Най новіші
          </Dropdown.Item>
        </DropdownButton>
       
      </div>
      <div className={c.cartWraper}>
        {sortData().length > 0 ?  sortData().map(e=><Cart key={e.index} el={e}/>): <p>Жодного товару не знайдено</p>}

      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import Cart from "./cart";

export default function CartList(c){
	let [data, setData] = useState([])
	
	useEffect(()=>{
		let Fch = ()=>{
			fetch(
				"https://gist.githubusercontent.com/Tor4in/ae737e10ea87c6aade5264b7c6849ad4/raw/5b4a669b982cb5a31f521ca8473a6cb448af668b/carts.json"
			)
				.then((res) => res.json())
				.then((e) => setData(e));
		}
		Fch()
	}, [])
	
	let filther = (cat)=>{
		let out = data.filter((e)=>{
			if(cat.c.brand === 'Бренд' && parseInt(e.price) >= cat.c.price[0] && parseInt(e.price) <= cat.c.price[1]) {return 1
			} else if(cat.c.brand === e.brand && parseInt(e.price) >= cat.c.price[0] && parseInt(e.price) <= cat.c.price[1]) {return 1} else {return 0}
		})
		return out
	}

	return(
		<>
			{filther(c).map((e, key)=>{
				return <Cart key={key} el={e}/>
			})}
		</>
	)
}
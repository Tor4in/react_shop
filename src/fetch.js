import { useState } from "react"

export default function Featching (){
	let [data, setData] = useState([])
	fetch(`https://gist.githubusercontent.com/Tor4in/88d536a4b50969cec5572acba7a29317/raw/7590621ab43ac3438b8ec2d5f42668a32ac0438e/find_api-data.json`)
  .then((res) => res.json())
  .then((e) => {
		setData(e)
  });
	return <>{console.log(data)}</>;
}
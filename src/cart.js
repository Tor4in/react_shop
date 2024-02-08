import c from "./cart.module.css";
export default function Cart(props) {
  return (
    <div className={c.cart}>
			<img className={c.cartImage} src={require(`./images/carts/${props.el.image}`)} alt=""/>
			<span>
      <p className={c.title}>{props.el.title}</p>
      <h1 className={c.name}>{props.el.name}</h1>
      <p className={c.price}><span>{props.el.price}</span></p> 
			</span>
    </div>
  );
}
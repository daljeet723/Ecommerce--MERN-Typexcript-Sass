import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc"
import CartItem from "../components/cart-item";

const cartItems = [
  {
    productId:"dbhend",
    photo:"https://m.media-amazon.com/images/I/71vFKBpKakL._SX569_.jpg",
    name:"MacBook",
    price:84000,
    quantity: 2,
    stock:10
  }
];
const subtotal = 2000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 120;
const discount = 400;
const total = subtotal + tax + shippingCharges;


const Cart = () => {

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


  //when coupon changes then call useEffect
  //when user type something show invalid upto time user stops typing
  useEffect(()=>{

    const timeOutId = setTimeout(()=>{
      //50% chances of correct code 0.5 means 50%
      //after every 1 sec
      if(Math.random()> 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },1000);

    return ()=>{
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  },[couponCode]);

  return (
    <div className="cart">

      {/* Product details on left side */}
      <main>
        {cartItems.map((i,idx)=>(
          <CartItem key={idx} cartItem={i} />
        ))}
      </main>

      {/* Right side checkout details */}
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>Discount: <em> -  ₹{discount}</em></p>
        <p><b>Total: ₹{total}</b></p>
        <input type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {/* if coupon exists then only check for valid ot invalid code */}
        {couponCode && (
          isValidCouponCode ?
            (<span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>) :
            (<span className="red">
              Invalid Coupon <VscError />
            </span>)
        )}
      </aside>
    </div>
  )
}

export default Cart
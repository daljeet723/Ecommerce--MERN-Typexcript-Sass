import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc"
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "dbhend",
    photo: "https://m.media-amazon.com/images/I/71vFKBpKakL._SX569_.jpg",
    name: "MacBook",
    price: 84000,
    quantity: 2,
    stock: 10
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
  useEffect(() => {

    const timeOutId = setTimeout(() => {
      //50% chances of correct code 0.5 means 50%
      //after every 1 sec
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">

      {/* Product details on left side */}
      <main>
        {cartItems.length > 0 ?
          (cartItems.map((i, idx) => (
            <CartItem key={idx} cartItem={i} />
          ))) :
          (<h1>No Items Added</h1>)
        }

      </main>

      {/* Right side checkout details */}
      <aside>
        <p>Subtotal:
          <span className="priceDetail">₹{subtotal}</span>
        </p>
        <p>Shipping Charges:
          <span className="priceDetail">₹{shippingCharges}</span>
        </p>
        <p>Tax:
          <span className="priceDetail">₹{tax}</span>
        </p>
        <p>Discount:
          <span className="priceDetail"><em> -  ₹{discount}</em></span>
        </p>
        <p><b>Total: </b>
          <span className="priceDetail"> <b>₹{total}</b></span>
        </p>
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
        )};

        {/* Navigate to shipping page if items exists in cart */}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  )
}

export default Cart
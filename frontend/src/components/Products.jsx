import React from "react";
import "./Products.scss";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Products = ({ products }) => {
  async function displayRazorpay(prod) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await axios.post("http://localhost:8000/razorpay", {
      amount: prod.price,
    });

    console.log(data);

    const options = {
      key: "rzp_test_EjcezZcjp2kQNI",
      currency: data.data.currency,
      amount: data.data.amount.toString(),
      order_id: data.data.id,
      name: prod.name,
      description: "Test for payment gateway",
      image: "",
      handler: function (response) {
        alert(
          "Order successful with: \nPayment ID:" +
            response.razorpay_payment_id +
            "\nOrder ID:" +
            response.razorpay_order_id +
            "\nSignature:" +
            response.razorpay_signature
        );
      },
      prefill: {
        name: prod.name,
        email: "xyz@gmail.com",
        phone_number: "9898989898",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return products.map((prod) => (
    <div className="product" key={prod.id}>
      <section>
        <h2>{prod.name}</h2>
        <p>{prod.desc}</p>
        <h3>{"₹" + prod.price}</h3>
        <button type="button" onClick={() => displayRazorpay(prod)}>
          PURCHASE
        </button>
      </section>
      <img src={prod.img} alt={prod.name} />
    </div>
  ));
};

export default Products;

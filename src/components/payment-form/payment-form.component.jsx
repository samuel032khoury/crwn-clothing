import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";

import Button from "../button/button.component";

import './payment-form.styles.scss';
import {useSelector} from "react-redux";
import {selectCartTotal} from "../../store/slices/cart.slice";
import {selectUser} from "../../store/slices/user.slice";

const PaymentForm = () => {

  const stripe = useStripe()
  const elements = useElements()
  const paymentTotal = useSelector(selectCartTotal) * 100
  const user = useSelector(selectUser)

  const paymentHandler = async (e) => {
    e.preventDefault();
    if(!stripe || !elements) return;
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: paymentTotal})
    }).then(res => res.json())
    const {paymentIntent: {client_secret}} = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "TEST USER"
        }
      }
    });
    if (paymentResult.error) {
      alert(paymentResult.error)
    } else if (paymentResult.paymentIntent.status === 'succeeded'){
      alert("Payment successful!")
    }
  }


  return (
    <div className={'payment-form-container'}>
      <form className={'payment-form'} onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement/>
        <Button extraClassName={'inverted'} submit={true}>Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentForm;
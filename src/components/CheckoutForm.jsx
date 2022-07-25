import { PayPalButton } from 'react-paypal-button-v2';
import { usePaystackPayment } from 'react-paystack';

const config = {
  reference: new Date().getTime().toString(),
  email: 'user@example.com',
  amount: 20000,
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  body: JSON.stringify('User Data'),
};

// you can call this function anything
const onSuccess = reference => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);

};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

export const CheckoutForm = () => {
  const initializePayment = usePaystackPayment(config);
  const handleSubmit = async event => {
    event.preventDefault();
  };

  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay with Paypal
      </button>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay with PayStack
      </button>
    </div>
  );
};

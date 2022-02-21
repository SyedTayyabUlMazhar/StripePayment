import React, {useState, useEffect} from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';
import API from './API';


export default App = () =>
{

  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () =>
  {
    const key = await API.fetchPublishableKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(()=>{
    fetchPublishableKey();
  }, [])

  useEffect(() =>
  {
    console.log({ publishableKey });
  }, [publishableKey])


  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
    >
      <PaymentScreen />
    </StripeProvider>
  );
}

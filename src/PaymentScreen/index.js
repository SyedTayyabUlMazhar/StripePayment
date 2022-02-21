import React, { useEffect, useRef, useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import API from '../API';



export default function PaymentScreen ()
{
  const { confirmPayment } = useStripe();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const pay = async () =>
  {
    setErrorMessage();
    setSuccessMessage();

    const clientSecret = await API.fetchClientSecret();

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: 'Card',
    });

    if (error)
    {
      console.log('Payment confirmation error', error);
      setErrorMessage(error.message);
    } else if (paymentIntent)
    {
      console.log('Success from promise', paymentIntent);
      setSuccessMessage(`Payment success! Paid amount: ${paymentIntent.amount}€  \nPaymentId: ${paymentIntent.id}`);
    }
  };

  const MyButton = (props) =>
  {
    const { title, onPress, style } = props;
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#2e2e2e',
        marginHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 6,
      },
      title: {
        color: '#dedede'
      },
    });
    
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.container, style])} onPress={onPress}>
        <Text style={styles.title}>{title?.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
          borderWidth: 1, borderColor: 'red',
        }}
        onCardChange={(cardDetails) =>
        {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) =>
        {
          console.log('focusField', focusedField);
        }}
      />


      <MyButton title="Pay" onPress={pay} style={{ marginTop: 10 }} />
      {errorMessage && <Text style={{ color: 'red', alignSelf: 'center', marginTop: 20, fontSize: 20 }}>{errorMessage}</Text>}
      {successMessage && <Text style={{ color: 'green', alignSelf: 'center', marginTop: 20, fontSize: 20 }}>{successMessage}</Text>}
    </View>
  );
}
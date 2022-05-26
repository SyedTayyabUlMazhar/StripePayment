import { create } from "apisauce";

const Api = create({
  baseURL: 'http://localhost:4242',
  timeout: 10_000,
});


const fetchPublishableKey = async () =>
{
  const response = await Api.get('/fetchPublishableKey');
  return response.data.publishableKey;
}



const fetchClientSecret = async () =>
{
  const response = await Api.post('/create-payment-intent');
  return response.data.clientSecret;
};

export default {fetchPublishableKey, fetchClientSecret};
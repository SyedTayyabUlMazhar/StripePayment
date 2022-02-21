const express = require("express");
const app = express();

const PUBLISHABLE_KEY = 'pk_test_51KOLyrFZ4Qg54MTvayCXozqsjUPURffM4ht6avVqMFVfKEhXoTj3eqSq5xELXzc5OFPrV1HbzVZ4YT7JRHWjNhz900ISXciXWP';
const SECRET_KEY = 'sk_test_51KOLyrFZ4Qg54MTvSJEW5rLXZXpEwT7XBy1QAepLcyrjpR5aH7WOpAyeeXMNaY5Ba7FNv3Gcrs5U3fB6TOBNO1do00yMbY9RQC';

const stripe = require("stripe")(SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());


app.get('/fetchPublishableKey', (req, res) => {
  res.send({
    publishableKey: PUBLISHABLE_KEY,
  });
});


app.post("/create-payment-intent", async (req, res) => {

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));
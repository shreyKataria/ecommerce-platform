const { default: Stripe } = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mockStripe = require("../nock/paymentsNock");

mockStripe();

// nock('https://payment-gateway.example.com')
//   .post('/pay')
//   .reply(200, { message: 'Payment processed successfully' });

exports.processPayment = async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;

  if (!amount || !currency || !paymentMethodId) {
    return res
      .status(400)
      .send("Amount, currency, and payment method ID are required");
  }

  try {
    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

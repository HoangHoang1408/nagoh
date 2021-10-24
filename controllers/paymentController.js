import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import catchAsync from "../middlewares/catchAsync";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsync(async (req, res, next) => {
  const { checkInDate, checkOutDate } = req.body;

  const daysOfStay = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / 86400000
  );
  const { origin } = absoluteUrl(req);
  const room = await Room.findById(req.query.roomId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      daysOfStay,
    },
    line_items: [
      {
        name: room.name,
        images: room.images.map((e) => e.url),
        amount: +room.pricePerNight * +daysOfStay * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    success: true,
    session,
  });
});

export const webhookCheckOut = catchAsync(async (req, res, next) => {
  const rawBody = await getRawBody(req);
  try {
    console.log("this is 1");
    const signature = req.headers["stripe-signature"];
    console.log("this is 2");
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("this is 3");
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email }))._id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;
      console.log("this is 4");
      await Booking.create({
        room,
        user,
        amountPaid,
        checkInDate,
        checkOutDate,
        daysOfStay,
        paymentInfo,
        paidAt: Date.now(),
      });
      console.log("this is 4");
      console.log("oke123");
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

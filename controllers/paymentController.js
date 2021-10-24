import Room from "../models/room";
import catchAsync from "../middlewares/catchAsync";
import absoluteUrl from "next-absolute-url";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsync(async (req, res, next) => {
  const { checkInDate, checkOutDate, daysOfStay, amount } = req.body;
  const { origin } = absoluteUrl(req);
  const room = await Room.findById(req.query.roomId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: room.images.map((e) => e.url),
        amount: amount * 100,
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

module.exports = {
  env: {
    DB_CONNECT_STRING:
      "mongodb+srv://hoang:hYvrSfw8QwTZh9xq@cluster0.unoc1.mongodb.net/main?retryWrites=true&w=majority",
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "0be22112f13e8a",
    SMTP_PASSWORD: "421e0d4291e880",
    SMTP_FROM_NAME: "BookIT",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    NUMBER_OF_REVIEWS_DISPLAYED_ON_ROOM_PAGE: 6,
    STRIPE_SECRET_KEY:
      "sk_test_51JQP7pJh69crEUmAVZhREq54Dfxnt3P6N24Lsxpl2U9qtQEma9xFxJcFJIwP7P9cXCloup6Yx1R6IBs8D99UGDre00d8tslE8F",
  },
  images: {
    domains: ["res.cloudinary.com", "firebasestorage.googleapis.com"],
  },
};

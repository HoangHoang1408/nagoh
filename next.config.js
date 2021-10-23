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
  },
  images: {
    domains: ["res.cloudinary.com", "firebasestorage.googleapis.com"],
  },
};

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
  secret: "hellofromhoang14",
  session: {
    jwt: true,
    updateAge: 24 * 60 * 60,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please enter email and password!");
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid Email or Password ");
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) throw new Error("Invalid Email or Password ");
        return Promise.resolve({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          email: user.email,
        });
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) token.user = user;
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});

import { Strategy as JwtStrategy } from "passport-jwt";
import User from "../../models/User.js";

const cookieExtracter = (req) => req.cookies?.accessToken;
const jwtStrategy = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtracter,
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      },
      async (payload, done) => {
        try {
          console.log(payload.userId);
          
          const user = await User.findById(payload.userId);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};

export default jwtStrategy;

import Strategy from "passport-google-oauth20";
import passport from "passport";
import User from "../db/schemas/User";

export default class Strategies {
  public static config() {
    this._googleConfig();
  }

  private static async _googleConfig() {
    passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `http://localhost:${process.env.UBER_CLONE_PORT}/api/v1/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
          const firstName = profile.name.givenName;
          const lastName = profile.name.familyName;
          const email = profile.emails[0].value;
          const avatar = profile.photos[0].value;

          let user = await User.findOne({ email });
          if (!user) {
            await User.create(
              {
                firstName,
                lastName,
                email,
                avatar,
              },
              function (err, user) {
                return cb(err, user);
              }
            );
          } else {
            return cb(null, user);
          }
        }
      )
    );

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
      done(null, user._id);
      // where is this user.id going? Are we supposed to access this anywhere?
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
      User.findById({ _id: id }, function (err, user) {
        done(err, user);
      });
    });
  }
}

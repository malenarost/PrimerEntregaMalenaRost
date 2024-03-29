import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { userModel } from '../DAO/models/users.model.js';
import { cartsModel } from '../DAO/models/carts.model.js';
const LocalStrategy = local.Strategy;
import GitHubStrategy from 'passport-github2';
import fetch from 'node-fetch';

export function initializePassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        console.log(username, password);
        const user = await userModel.findOne({ email: username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        if (!isValidPassword(password, user.password)) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      try {
        const { email, firstName, lastName, age } = req.body;
        let user = await userModel.findOne({ email: username });
        if (user) {
          return done(null, false, { message: 'User already exists' });
        }

        const cart = await cartsModel.create({});

        const newUser = {
          email,
          firstName,
          lastName,
          age,
          password: createHash(password),
          cart: cart._id,
        };

        let userCreated = await userModel.create(newUser);
        return done(null, userCreated, { message: 'User created' });
      } catch (error) {
        return done(error, { message: 'Error creating user' });
      }
    })
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.741b89f80a399j38',
        clientSecret: '89832jfr99ufjjhkq6h4kkkbfkb33',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        console.log(profile);
        try {
          console.log(profile);
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await userModel.findOne({ email: profile.email });
          if (!user) {
            const cart = await cartsModel.create({});
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'externalAuth',
              password: createHash('nopass'),
              cart: cart._id,
            };
            let userCreated = await userModel.create(newUser);
            console.log('User Registration succesful');
            return done(null, userCreated);
          } else {
            console.log('User already exists');
            return done(null, user);
          }
        } catch (e) {
          console.log('Error en auth github');
          console.log(e);
          return done(e);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});

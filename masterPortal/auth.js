var passport = require('passport'),
SamlStrategy = require('passport-saml').Strategy;

var users = [];

function findByEmail(nameID, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.nameID  === nameID ) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, {
    id      : user.nameID,
    grp  : user.Group,
    firstName : user.firstName,
    lastName  : user.lastName,
  });
});

passport.deserializeUser(function(id, done) {
  findByEmail(id.tkid, function (err, user) {
    done(err, user);
  });
});

passport.use('saml', new SamlStrategy(
  {
    issuer: process.env.ISSUER,
  	path: process.env.PATH,
    protocol: process.env.PROTOCOL,
    entryPoint: process.env.ENTRYPOINT,
    cert: process.env.CERT,       
  },
  function(profile, done) {
    if (!profile.nameID) {
      return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
      findByEmail(profile.nameID , function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      })
    });
  }
));

passport.protected = function(req, res, next) {
  console.log("req.isAuthenticated() ----------- ", req.isAuthenticated(),"-----close--")
  if (req.isAuthenticated()) {   
    return next();
  } 
  console.log("req /login?url_to_redirect=----------- ", req.url,"-----request close--");  
  res.redirect(`/login?url_to_redirect=${req.url}`);
};

 exports = module.exports = passport;
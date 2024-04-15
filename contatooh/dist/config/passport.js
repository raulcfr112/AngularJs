var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var accessToken = "8322fab2c26f0e34dd8c6bbe99d4a7c7b899a35f"

module.exports = function() {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'Iv1.18f6a39a845d3d87',
        clientSecret: accessToken,
        callbackURL: 'http://localhost:3000/auth/github/callback',
        customHeaders: {"Authorization": "token " + accessToken}
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }))

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
};

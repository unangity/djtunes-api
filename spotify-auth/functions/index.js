const functions = require("firebase-functions");
var request = require("request");
// TODO: Use secret manager
const spotify = require("./config/spotify");

const spotifyAuth = async (req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(spotify.id + ":" + spotify.secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      res.status(200).json(body);
      console.log("Token: " + token);
    }
  });
};

exports.spotifyAuth = functions.https.onRequest(spotifyAuth);

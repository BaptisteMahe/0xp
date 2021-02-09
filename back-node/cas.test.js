const http = require('http');
const app = require('express')();
const session = require('express-session');
const CASAuthentication = require('cas-authentication');

const PORT = 3000

// Set up an Express session, which is required for CASAuthentication.
app.use( session({
    secret            : 'super secret key',
    resave            : false,
    saveUninitialized : true
}));

// Create a new instance of CASAuthentication.
const cas = new CASAuthentication({
    cas_url     : 'https://auth.test.ec-m.fr/cas',
    service_url : 'http://localhost:3000',
    is_dev_mode: true
});

// Unauthenticated clients will be redirected to the CAS login and then back to
// this route once authenticated.
app.get( '/app', cas.bounce, function ( req, res ) {
    res.send( '<html><body>Hello!</body></html>' );
});

// Unauthenticated clients will receive a 401 Unauthorized response instead of
// the JSON data.
app.get( '/api', cas.block, function ( req, res ) {
    res.json( { success: true } );
});

// An example of accessing the CAS user session variable. This could be used to
// retrieve your own local user records based on authenticated CAS username.
app.get( '/api/user', cas.block, function ( req, res ) {
    res.json( { cas_user: req.session[ cas.session_name ] } );
});

// Unauthenticated clients will be redirected to the CAS login and then to the
// provided "redirectTo" query parameter once authenticated.
app.get( '/authenticate', cas.bounce_redirect );

// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
app.get( '/logout', cas.logout );


app.get('/test', function(req, res, next) {
    res.json(req.session);
});

let httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));

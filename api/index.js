try { require('fs').unlinkSync(process.env.PORT); }
catch (e) { }
require('./server.js')().listen(process.env.PORT);

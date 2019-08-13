const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://User:${process.env.MONGO_ATLAS_PW}@courework-shaiv.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  },
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

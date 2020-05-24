const mongoose = require('mongoose');

// const uri = 'mongodb://quest:temp_quest@47.97.110.251:47203/question' // 问卷线上
const uri = 'mongodb://127.0.0.1:27017/questions' // 本地

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () => {
    console.log('connected!');
})
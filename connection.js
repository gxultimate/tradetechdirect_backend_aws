var mongoose = require('mongoose')

const connect = 'mongodb+srv://gxultimate:edfe4c891007@tradetech-nkam5.gcp.mongodb.net/test?retryWrites=true&w=majority'
const  connectDB =  async() => {
  await mongoose.connect(connect , {useUnifiedTopology : true , useNewUrlParser: true})
  console.log('db connected...')
}


module.exports = connectDB;
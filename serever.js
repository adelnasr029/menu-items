let express = require('express')
let app = express()
let cors = require('cors')
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})
app.listen(3000,() => {
    console.log('listening on port 2000')
})
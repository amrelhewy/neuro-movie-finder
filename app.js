const express=require('express');
const app=express();
const cors=require('cors');
const brain=require('brain.js');

const net = new brain.recurrent.LSTM({hiddenLayers:[5,5]});
const dataa=require('./data.json')
 net.train(dataa,{iterations:100,log:stats=>console.log(stats)})

const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors({maxAge:86400,origin:'http://localhost:3000'}));
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
app.use(express.static(__dirname+'/build'));

app.post('/find',async(req,res)=>{
const {category,duration,place}=req.body;
const output=net.run([`${category}`,`${duration}`,`${place}`]);
res.status(200).send(output);
});

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
})
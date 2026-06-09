import {Redis} from 'ioredis'

const connection=new Redis(process.env.REDIS_URL!,{
    maxRetriesPerRequest:null
})

connection.on("connect",()=>{
    console.log("Redis connected (upstash)")
})

connection.on("error",(err)=>{
    console.error("Redis error:",err)
})

export default connection
import * as fs from "fs";

export default function handler(req, res) {
    fs.readdir("blogdata",(err,data)=>{
        if(err){
            res.status(500).json({ error: "Internal Server Error"})
        }
        res.status(200).json(data);
    })
}
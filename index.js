// importing the express js  
const express=require("express");
// importing fs module 
const fs=require("fs");

const app=express();
const PORT=8000;
const users=require("./MOCK_DATA.json");

// middleware 
app.use(express.urlencoded({extended:false}));

app.get("/api/users", (req,res)=>{
  return res.json(users);
});
app.get("/users",(req,res)=>{
  const html=  `
  <ul>
  ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
  </ul>`;
  res.send(html);
});
// defining the route ("/api/users/:id") for get, patch, and delete request 
app
.route("/api/users/:id")
.get((req,res)=>{
  const id= Number(req.params.id);
  const user=users.find((user)=>user.id===id);
  return res.send(user);
})
.patch((req,res)=>{
  //edit the existing user
  return res.send({status:"pending"});
})
.delete((req,res)=>{
  // delete the existing user 
  return res.send({status:"pending"});
})

app.post("/api/users",(req,res)=>{
  const body=req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
    return res.status(400).json({msg:"All fields are required!"})
  }
  users.push({...body,id:users.length+1});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status:"success",id: users.length});
  })
})

app.listen(PORT, ()=> console.log(`Server has started listening on the port: ${PORT}`));

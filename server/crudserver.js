import http from "http";

const port = 5001;
const users = [
  { id: 1, name: "a", email: "a@gmail.com" },
  { id: 2, name: "b", email: "b@gmail.com" },
  { id: 3, name: "c", email: "c@gmail.com" },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url.startsWith("/users") && method == "GET") {
    const id = url.split("/")[2];
    const user = users.find((u) => u.id == id);

    if (!user) {
      res.statusCode = 400;
      res.end(`user id ${id} not found`);
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    }
  } 
  
  else if (url === "/createuser" && method == "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);
const userIndex=users.findIndex(u=>u.email==data.email);
if(userIndex!=-1)
{res.statusCode=400;
  console.log("user already exists")
  return res.end("user already exists")
}
      const newUser = {     
        id: Date.now(),
        name: data.name,
        email: data.email,
      };

      users.push(newUser);  

      res.statusCode = 200; 
      console.log(`user id ${newUser.id} created successfully`);
      res.end(`user id ${newUser.id} created successfully`);
    });
  } 
  
  else if (url === "/users/" && method == "DELETE") {
    const id=url.split("/")[2];
    const userIndex=users.findIndex(u=>u.email==data.email);
    if(userIndex==-1)
    {
      res.statusCode=400;
      console.log(`user id ${id} not found`)
      return res.end(`user id ${id} not found`)
    }
    users.splice(userIndex,1)

    res.statusCode = 200;
    console.log( `user id ${id } delete successfully`)
    res.end( `user id ${id } delete successfully`)
  } 
  
//   else if (url.startsWith("/users/") && method == "PATCH") {
// const id=url.split("/")[2]

// const userIndex=users.findIndex(u=>u.email==data.email);
//     res.statusCode = 200;
//     res.end(JSON.stringify(users));
//      req.on("end", () => {
//       const data = JSON.parse(body);

// if(userIndex!=-1)
// {res.statusCode=400;
//   console.log("user already exists")
//   return res.end("user already exists")
// }
// users[userIndex]
//   } 
  
  else {
    res.statusCode = 404;
    res.end("");
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
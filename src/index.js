const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');


function getMethodResponse(request,response,responseUrl,ContentType,fileName){
  if(request.url === responseUrl) {
    const pathUrl = path.join(__dirname,fileName);
    const responseData = fs.readFileSync(pathUrl,'utf-8',function(err,data){
      if(err){
        console.error(err);
      }
      return data;
    });

    response.writeHead(200,{"Content-type":`${ContentType}; charset=utf-8`});
    response.write(responseData);
    response.end();
  }
}


const server = http.createServer(function(request, response){
  if(request.method === "GET") {


    if(request.url === "/") {
      getMethodResponse(request,response,"/","text/html","../public/index.html");
      };

  }

  // if(request.url === "/style.css") {
  //   const pathUrl = path.join(__dirname,"../public/stlye.css");
  //   const responseData = fs.readFileSync(pathUrl,'utf-8',function(err,data){
  //     if(err){
  //       console.error(err);
  //     }
  //     return data;
  //   });
  //   response.writeHead(200,{"Content-type":"text/css; charset=utf-8"});
  //   response.write(responseData);
  //   response.end();
  // }

  // if(request.url === "/script.js") {
  //   const pathUrl = path.join(__dirname,"../public/script.js");
  //   // 경로를 못찾을 때 사용
  //   const responseData = fs.readFileSync(pathUrl,'utf-8',function(err,data){
  //     if(err){
  //       console.error(err);
  //     }
  //     return data;
  //   });
  //   response.writeHead(200,{"Content-type":"application/javascript; charset=utf-8"});
  //   response.write(responseData);
  //   response.end();
  // }

if(request.method === "POST") {

} 

});

server.listen(3000,function(){
  console.log("http://localhost:3000");
});
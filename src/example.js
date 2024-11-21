const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');


function getMethodResponse(request, response, responseURL, ContentType, fileName) {
  if(request.url === responseURL) {
    const pathUrl = path.join(__dirname, fileName);
    const responseData = fs.readFileSync(pathUrl, 'utf-8', function(err, data) {
      if(err) {
        console.error(err);
      }
      return data;
    });
    response.writeHead(200, {"content-type": `${ContentType}; charset=utf-8`});
    response.write(responseData);
    response.end();

  }

}






const server = http.createServer(function(request, response) {

if(request.method === "GET") {
  if(request.url === "/") {
    getMethodResponse(request, response,  "/", "text/html", "../public/index.html");
  }

  if(request.url === "/style.css") {
    getMethodResponse(request, response,  "/style.css", "text/css", "../public/style.css");
  }
  if(request.url === "/script.js") {
    getMethodResponse(request, response,  "/script.js", "application/javascript", "../public/script.js");
  }


} 

if(request.method === "POST") {
  //html에서 form의 post 방식
  if(request.url === "/from-minji"){
    // action에서 적어준 것을 가져옴
    // console.dir(request);
    // 조건을 통과한 request

    request.on("data",function(data){
      let chunk = decodeURI(data.toString('utf-8'));
      console.log(chunk);
    });
  }
}




});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
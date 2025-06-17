var http = require('http');

//var server = http.createServer(function (req,res){
    //res.end("Hi,selamat datang di nodejs semua!!");
    //res.writeHead(200,{'Content-Tpye': 'text/html'});
    //res.end("<h1>Hi, selamat datang di nodejs semua!!<h1>");
    //res.end();
    http.createServer(function(request,response){
        response.writeHead(200,{'Content-Type': 'text/html'});
        switch(request.url){
            case '/about':
                response.write("Ini adalah halamau about");
                break;
            case '/profile':
                response.write("Ini adalah halaman profile");
                break;
            case '/produk':
                response.write("Ini adalah halaman produk");
                break;
            default:
                response.write("404: Halaman tidak ditemukan");
        }
        response.end();
    }).listen(8000);

 console.log("server running on http://localhost:8000");
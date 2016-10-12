var players=2;
var express=require('express');
var app=express();
port=process.env.PORT ||3000;
//port=443;
app.use(express.static(__dirname));
app.get("/",function(req,res){
	res.render("index.php");
})
var webSocketServer=require("websocket").server;
var server= require("http").createServer(app);
server.on("connection",function(socket){
	console.log("connection from: ",socket.address().address);});
var ws=new webSocketServer({
	httpServer :server,
	autoAcceptConnections: true
	});
console.log(port);
server.listen(port);

var clients=[];
ws.on("connect" , connectHandler);
function connectHandler(conn){
	conn.nickname=conn.remoteAddress;
	conn.on("message", messageHandler);
	conn.on("close", closeHandler);
	if(clients.length<players)
		{clients.push(conn);
		console.log(conn.nickname + "entered the game");}
	else
		{console.log("overlimit");
		closeHandler();
		}

}

function broadcast(data){
	clients.forEach(function(client){
		client.sendUTF(data);
	});
}
function closeHandler(){
	var index=clients.indexOf(this);
	if(index>-1){
		clients.splice(index,1);
	}
		console.log(this.nickname + "left the game");
}

function messageHandler(message){
	var data=JSON.parse(message.utf8Data);
	this.nickname=data[2];
	data=JSON.stringify(data);
	console.log(this.nickname +"  "+data);
	broadcast(data);
}
/*function game_loop(){

	while(1)
	{
		for(i=0;i<players;i++)
		{

		}
	}
}*/

var num=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
var players=2;
var ch=0;
var player=[['unknown','red'],['unknown','green']];
var express=require('express');
var app=express();
port=process.env.PORT ||3000;
//port=443;
app.use(express.static(__dirname));
app.get("/",function(req,res){
	res.render("index.html");
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
	if(ch==1) ch=2;
	else ch=1;
	gameloop();
	var data=JSON.parse(message.utf8Data);
	if(data[0]=='initializePlayer'){
		initializePlayer(data[1]);
	}
	else if (data[0]=='onclicked') {
		onclicked(data);
	}
	console.log(this.nickname +"  "+data);
}
function gameloop(){
	clients.forEach(function(client){
		if(client.nickname==clients[ch-1].nickname){
				client.sendUTF(JSON.stringify(['update','false',player[ch-1][0],player[ch-1][1]]));
		}
		else {
				client.sendUTF(JSON.stringify(['update','true',player[ch-1][0],player[ch-1][1]]));
		}
	});
}
var initializePlayer=function(name){
	this.nickname=name;
	if(clients.length==2){
		player[0][0]=clients[0].nickname;
		player[1][0]=clients[1].nickname;
		ch==2;
	}
}

var onclicked=function(msg){
	msg[0]='initiate';
	data=JSON.stringify(msg);
	broadcast(msg);
}

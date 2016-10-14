var num=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
var colorarray=[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']];
var ws;
var color='';
			var name=prompt("enter your name");
			function checkgame(x,y)
			{	var arr=['onclicked',x,y,name];
				jarr=JSON.stringify(arr);
				ws.send(jarr);
			}
			function initiate(arr)
			{	jdec=JSON.parse(arr);
				var x=jdec[0];
				var y=jdec[1];
				num[x][y]++;
				var pt=""+x+y;
				document.getElementById(pt).innerHTML=num[x][y];
				check(x,y,num[x][y],color);
			}

			function check(x,y,value,color)
			{
				if(value==2)
				{
					if((x==0&&y==0) || (x==8&&y==0) || (x==0&&y==5) || (x==8&&y==5))
						brkblk(x,y,color);
				}
				if(value==3)
				{
					if((x==0) || (x==8 || (y==0) || (y==5)))
						brkblk(x,y,color);
				}
				if(value==4)
				{
						brkblk(x,y,color);
				}
				draw(x,y,color);
			}
			function brkblk(x,y,color)
			{	colorarray='';
				num[x][y]=0;
				if(x!=0)
				{	colorarray[x-1][y]=color;
					num[x-1][y]++;
					check(x-1,y,num[x-1][y],color);
				}
				if(x!=8)
				{ colorarray[x+1][y]=color;
					num[x+1][y]++;
					check(x+1,y,num[x+1][y],color);
				}
				if(y!=5)
				{ colorarray[x][y+1]=color;
					num[x][y+1]++;
					check(x,y+1,num[x][y+1],color);
				}
				if(y!=0)
				{ colorarray[x][y-1]=color;
					num[x][y-1]++;
					check(x,y-1,num[x][y-1],color);
				}
			}
			function draw(x,y,color)
			{
				var pt=""+x+y;
				var imgdiv=document.getElementById(pt);
				if(num[x][y]==0)
					document.getElementById(pt).innerHTML="";
				if(num[x][y]==1)
					//document.getElementById(pt).innerHTML="<img src="+color+'Single.png'+"width=45px height=45px/>";
					imgdiv.src=color+'Single.png';
				if(num[x][y]==2)
					//document.getElementById(pt).innerHTML="<img src='redDouble.png' width=45px height=45px />";
					imgdiv.src=color+'Double.png';
				if(num[x][y]==3)
					//document.getElementById(pt).innerHTML="<img src='redTriple.png' width=45px height=45px />";
					imgdiv.src=color+'Triple.png';
			}



function setupChat(){
	var HOST=location.origin.replace(/^http/,'ws');
	//HOST="ws://chainreaction154.herokuapp.com:3000/";
	ws=new WebSocket(HOST);
	write("welcome to very simple chat");
	ws.addEventListener("open",function(){
		write("opened connection");
	},false);
	ws.addEventListener("message",function(e){
		var recvdata=JSON.parse(e.data);
		if(recvdata[0]=='update'){
			update(recvdata);
		}
		else if (recvdata[0]=='initiate') {
			initiate(recvdata);
		}
	},false);
	ws.addEventListener("close",function(){
		write("connection closed");
	},false);
	sendName();
}

window.addEventListener("load",setupChat,false);

/*function setupInput(pt){
	var input = document.getElementById(pt);
	input.addEventListener("keydown",function(e){
		if(e.keyCode==13){
			ws.send(this.value);
			this.value="";
		}
	});
}*/
function sendName(){
	var arr=['initializePlayer',name];
	var data=JSON.stringify(arr);
	ws.send(data);
}
function write(str){
	//var response = document.getElementById("response"),
	console.log(str);
}
function update(udata){
	color=udata[3];
	console.log(udata[2]+"turn. Color is"+udata[3]+"condition="+udata[0]);
}

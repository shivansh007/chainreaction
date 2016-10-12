var num=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
var ws;

			var name=prompt("enter your name");
			function checkgame(x,y)
			{	var arr=[x,y,name];
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
				check(x,y,num[x][y]);
			}

			function check(x,y,value)
			{
				if(value==2)
				{
					if((x==0&&y==0) || (x==8&&y==0) || (x==0&&y==5) || (x==8&&y==5))
						brkblk(x,y);
				}
				if(value==3)
				{
					if((x==0) || (x==8 || (y==0) || (y==5)))
						brkblk(x,y);
				}
				if(value==4)
				{
						brkblk(x,y);
				}
				draw(x,y);
			}
			function brkblk(x,y)
			{
				num[x][y]=0;
				if(x!=0)
				{
					num[x-1][y]++;
					check(x-1,y,num[x-1][y]);
				}
				if(x!=8)
				{
					num[x+1][y]++;
					check(x+1,y,num[x+1][y]);
				}
				if(y!=5)
				{
					num[x][y+1]++;
					check(x,y+1,num[x][y+1]);
				}
				if(y!=0)
				{
					num[x][y-1]++;
					check(x,y-1,num[x][y-1]);
				}
			}
			function draw(x,y)
			{
				var pt=""+x+y;
				if(num[x][y]==0)
					document.getElementById(pt).innerHTML="";
				if(num[x][y]==1)
					document.getElementById(pt).innerHTML="<img src='redSingle.png' width=45px height=45px/>";
				if(num[x][y]==2)
					document.getElementById(pt).innerHTML="<img src='redDouble.png' width=45px height=45px />";
				if(num[x][y]==3)
					document.getElementById(pt).innerHTML="<img src='redTriple.png' width=45px height=45px />";

			}



function setupChat(){
	//var HOST=location.origin.replace(/^http/,'ws');
	HOST="ws://chainreaction154.herokuapp.com:3000/";
	ws=new WebSocket(HOST);
	write("welcome to very simple chat");
	ws.addEventListener("open",function(){
		write("opened connection");
	},false);
	ws.addEventListener("message",function(e){
		initiate(e.data);
	},false);
	ws.addEventListener("close",function(){
		write("connection closed");
	},false);
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
function write(str){
	//var response = document.getElementById("response"),
	console.log(str);}

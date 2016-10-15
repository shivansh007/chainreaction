var num=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
var colorarray=[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']];
var ws;
var prevColor='';
var color='';
var win=0;
var player=[['','red'],['','green']];
var pid=1;
			var name=prompt("enter your name");
			function checkgame(x,y)
			{
				var arr=['onclicked',x,y,name];
				jarr=JSON.stringify(arr);
				if(colorarray[x][y]=='' || colorarray[x][y]==color)
					ws.send(jarr);
				else {
					console.log('cant click here');
				}
			}
			function initiate(jdec)
			{	//jdec=JSON.parse(arr);
				var x=jdec[1];
				var y=jdec[2];
				num[x][y]++;
				var pt=""+x+y;
				document.getElementById(pt).innerHTML=num[x][y];
				//console.log(colorarray);
				//console.log(color);
				check(x,y,num[x][y],color);
				checkWin();
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
			{	colorarray[x][y]='';
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
				if(num[x][y]==0){
					document.getElementById(pt).innerHTML="";
					colorarray[x][y]='';
				}
				if(num[x][y]==1){
					document.getElementById(pt).innerHTML="<img src="+color+'Single.png' + " width=45px height=45px/>";
					colorarray[x][y]=color;
					//imgdiv.src=color+'Single.png';
				}
				if(num[x][y]==2){
					document.getElementById(pt).innerHTML="<img src="+color+'Double.png' + " width=45px height=45px/>";
					//imgdiv.src=color+'Double.png';
					colorarray[x][y]=color;
				}
				if(num[x][y]==3){
					document.getElementById(pt).innerHTML="<img src="+color+'Triple.png' + " width=45px height=45px/>";
					//imgdiv.src=color+'Triple.png';
					colorarray[x][y]=color;

				}
			}



function setupChat(){
	var HOST=location.origin.replace(/^http/,'ws');
	//HOST="ws://chainreaction154.herokuapp.com:3000/";
	ws=new WebSocket(HOST);
	write("___________CHAIN REACTION___________")
	write("______**developed by Blesson thomas**______");
	ws.addEventListener("open",function(){
		write(">>>opened connection");
		sendName();
		preloadimages(['redSingle.png', 'greenSingle.png', 'redDouble.png','greenDouble.png','redTriple.png','greenTriple.png']);
	},false);
	ws.addEventListener("message",function(e){
		var recvdata=JSON.parse(e.data);
		if(recvdata[0]=='updateui'){
			updateui(recvdata);
		}
		else if (recvdata[0]=='initiate') {
			initiate(recvdata);
		}
		else if (recvdata[0]=='initializePlayer') {
			initializePlayer(recvdata[1]);
		}
		else if (recvdata[0]=='logsContent'){
			logsContent(recvdata);
		}
	},false);
	ws.addEventListener("close",function(){
		write(">>>connection closed");
	},false);
	//sendName();
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
	str=["logsContent",str,'black'];
	logsContent(str);
}
function updateui(udata){
	prevColor=color;
	color=udata[3];
	console.log(player);
	console.log(udata[1],udata[2],udata[3]);
	var inputs=document.getElementsByTagName('tr');
	document.getElementById('dispname').innerHTML=udata[2]+"'s turn";
	document.getElementById('dispname').style.color=color;
	document.getElementById('chcol').style.border="2px solid "+color;
  for(var i=0; i<inputs.length; ++i)
	inputs[i].style.pointerEvents =udata[1];
}
function initializePlayer(pdata) {
	player=pdata;
}
function checkWin()
{
 var a=0,b=0,c=0;
 for(i=0;i<9;i++)
  for(j=0;j<6;j++)
  {
    if(num[i][j]!=0)
     a++;
    if(colorarray[i][j]==player[0][1])
     b++;
    else if(colorarray[i][j]==player[1][1])
     c++;
  }
 if(a==b && a>=2)
 {
   alert(player[0][0]+"won");
	 player=[['','red'],['','green']];
	 ws.send(JSON.stringify(['reinit']));
	 location.reload();
 }
 if(a==c && a>=2)
 {
   alert(player[1][0]+"won");
	 player=[['','red'],['','green']];
	 ws.send(JSON.stringify(['reinit']));
	 location.reload();
 }
}

function preloadimages(arr){
    var newimages=[];
    var arr=(typeof arr!="object")? [arr] : arr ;//force arr parameter to always be an array
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image();
        newimages[i].src=arr[i];
    }
}

function displayLogs(){
	document.getElementById('logs').style.display='block';
}
function closeLogs() {
	document.getElementById('logs').style.display='none';

}
function logsContent(data) {
	var outdiv=document.getElementById('logsbody');
	var idiv=document.createElement('div');
	idiv.id=pid+'';
	idiv.style.color=data[2];
	outdiv.appendChild(idiv);
	document.getElementById(pid+'').innerHTML=data[1];
	pid+=1;
}

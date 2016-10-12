<!DOCTYPE HTML>
<html lang= "en-US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no" >
	<title>CHAIN REACTION</title>
	<link rel="stylesheet" href="main.css">
	<script src="chclient.js"></script>
</head>
<body>
<?php include_once('nav.html');?>
	<div id="game">
		<div class="splash-screen"></div>
		<div class="main-menu"></div>
			<table id="grid" border="5" cellspacing="0" style="border-color:teal">
				<tr>
					<td onclick="checkgame(0,0)" id="00"></td>
					<td onclick="checkgame(0,1)" id="01"></td>
					<td onclick="checkgame(0,2)" id="02"></td>
					<td onclick="checkgame(0,3)" id="03"></td>
					<td onclick="checkgame(0,4)" id="04"></td>
					<td onclick="checkgame(0,5)" id="05"></td>
				<tr>
				<tr>
					<td onclick="checkgame(1,0)" id="10"></td>
					<td onclick="checkgame(1,1)" id="11"></td>
					<td onclick="checkgame(1,2)" id="12"></td>
					<td onclick="checkgame(1,3)" id="13"></td>
					<td onclick="checkgame(1,4)" id="14"></td>
					<td onclick="checkgame(1,5)" id="15"></td>
				<tr>
				<tr>
					<td onclick="checkgame(2,0)" id="20"></td>
					<td onclick="checkgame(2,1)" id="21"></td>
					<td onclick="checkgame(2,2)" id="22"></td>
					<td onclick="checkgame(2,3)" id="23"></td>
					<td onclick="checkgame(2,4)" id="24"></td>
					<td onclick="checkgame(2,5)" id="25"></td>
				<tr>
					<td onclick="checkgame(3,0)" id="30"></td>
					<td onclick="checkgame(3,1)" id="31"></td>
					<td onclick="checkgame(3,2)" id="32"></td>
					<td onclick="checkgame(3,3)" id="33"></td>
					<td onclick="checkgame(3,4)" id="34"></td>
					<td onclick="checkgame(3,5)" id="35"></td>
				<tr>
					<td onclick="checkgame(4,0)" id="40"></td>
					<td onclick="checkgame(4,1)" id="41"></td>
					<td onclick="checkgame(4,2)" id="42"></td>
					<td onclick="checkgame(4,3)" id="43"></td>
					<td onclick="checkgame(4,4)" id="44"></td>
					<td onclick="checkgame(4,5)" id="45"></td>
				<tr>
				<tr>
					<td onclick="checkgame(5,0)" id="50"></td>
					<td onclick="checkgame(5,1)" id="51"></td>
					<td onclick="checkgame(5,2)" id="52"></td>
					<td onclick="checkgame(5,3)" id="53"></td>
					<td onclick="checkgame(5,4)" id="54"></td>
					<td onclick="checkgame(5,5)" id="55"></td>
				<tr>
				<tr>
					<td onclick="checkgame(6,0)" id="60"></td>
					<td onclick="checkgame(6,1)" id="61"></td>
					<td onclick="checkgame(6,2)" id="62"></td>
					<td onclick="checkgame(6,3)" id="63"></td>
					<td onclick="checkgame(6,4)" id="64"></td>
					<td onclick="checkgame(6,5)" id="65"></td>
				<tr>
				<tr>
					<td onclick="checkgame(7,0)" id="70"></td>
					<td onclick="checkgame(7,1)" id="71"></td>
					<td onclick="checkgame(7,2)" id="72"></td>
					<td onclick="checkgame(7,3)" id="73"></td>
					<td onclick="checkgame(7,4)" id="74"></td>
					<td onclick="checkgame(7,5)" id="75"></td>
				<tr>
				<tr>
					<td onclick="checkgame(8,0)" id="80"></td>
					<td onclick="checkgame(8,1)" id="81"></td>
					<td onclick="checkgame(8,2)" id="82"></td>
					<td onclick="checkgame(8,3)" id="83"></td>
					<td onclick="checkgame(8,4)" id="84"></td>
					<td onclick="checkgame(8,5)" id="85"></td>
				<tr>
			</table>
		</div>		
	</div>
</body>
</html>
//var t=[0, 0, 0, 0, 0, 0, 0, 1];
var t=[0, 0, 0, 0, 0, 0, 0, 1];
var alphaChars = "ABCDEFGH";
var myChar = "A";

var db=[];
var p=0;

// 0/1 = start/end
// 2 = state
// 3 = length, ms
// 4 = timer
// 5 = epoch
// 6 = disp el
// 7 = lap count



// ss = Start/Stop
function ss() 
{
	t[t[2]]=(new Date()).valueOf();
	t[2]=1-t[2];

	if (0==t[2]) 
	{
		if (myChar=="A"||myChar=="B"||myChar=="C"||myChar=="D"||myChar=="E"||myChar=="F"||myChar=="G")
		{
			clearInterval(t[4]);
			t[3]+=t[1]-t[0];
			var ttt = document.getElementById("lap");
			var a = document.createElement("div");
	        
			a.id="div1";
	        a.innerHTML+="<table><tr><td width=55 align=center>"+"<b><font color=#09DF37>"+myChar+"</font></b>"+"</td><td width=116 align=center>"+format(t[1]-t[0])+"</td><td width=110 align=center>"+
			"<b>"+format(t[3])+"</b>"+"</td></tr></table>";
			
			// Vamos almacenando cada uno de los 7 (A-G) tiempos
			db[p]=format(t[1]-t[0]);
			p++;
			ttt.appendChild(a);
			
			t[4]=t[1]=t[0]=0;
			disp();
			myChar = incrementLetter(myChar);
			
			if (myChar=="H")
				{
				 alert("Enhorabuena!! Has terminado el recorrido")
				 $('#basedatos').show();
				 t[4]=t[3]=t[2]=t[1]=t[0]=0;
				 disp();
				 myChar="A";
				}
		}		
	} 
	else
	{
		t[4]=setInterval(disp, 43);
	}
}

/*function cargadatosdb() {
	var data = db.serializeArray();

	// setup the ajax request
	$.ajax({
		type: 'POST',
		url: 'cargadb.php',
		data: data,
		success: function() {
				alert('Se han subido los datos de la BBDD.');
			}
		});
	}*/
	
function cargadatosdb() {
	//alert(db);
	$.post('cargadb.php', {elements: db});
}
	
	
function incrementLetter(letterToIncrement)
{
 //find where the letter is at in the alphaChars string
 var indexOfLetter = alphaChars.search(letterToIncrement);

 //if it's not the last letter, then return the next
 //letter in the string
 if (indexOfLetter+1 < alphaChars.length) 
	{
	 return(alphaChars.charAt(indexOfLetter+1));
	}

	//otherwise return the input letter
 else
	{
	 return(letterToIncrement);
	}
}

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

// r = Reset

function r() 
{
	t[4]=t[3]=t[2]=t[1]=t[0]=0;
	document.getElementById('lap').innerHTML='';
      	// Si queremos que trás pulsar RESET se ponga
		// todo a 0 y empiece automacticamente,
		// descomentaremos lo siguiente:
		//ss();
	disp();
	t[7]=1;
}

function disp() 
{
	if (t[2]) t[1]=(new Date()).valueOf();
	t[6].value=format(t[3]+t[1]-t[0]);
}

function format(ms) 
{
	var d=new Date(ms+t[5]).toString()
		.replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, '$1');
	var x=String(ms%1000);
	while (x.length<3) x='0'+x;
	d+='.'+x;
	return d;
}

function stopwatch() 
{

	t[5]=new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();
	t[6]=document.getElementById('disp');
	disp();
}


<?php
	$arrtiempos = $_POST['elements'];
	$posiciones = array("A","B","C","D","E","F","G");
	$a=0;
	$con=mysql_connect("localhost", "root", "<pass>");
	if(!$con)
		{
		 die("Can not connect to server:".mysql_error());
		}
	mysql_select_db("ruta",$con) or die("cannot select db");
			
	foreach($arrtiempos as $valores){
		//$sql="INSERT INTO tiempos(tiempos) VALUES(".'.$valores.'.")";
		$sql = sprintf("INSERT INTO tiempos(posicion,tiempos) VALUES('%s','%s')",mysql_real_escape_string($posiciones[$a]),mysql_real_escape_string($valores));
		//echo $sql;
		//echo "<br>";
		//echo $posiciones[$a];
		//echo "<br>";
		//echo $a;
		//echo "<br>";
		$a++;
		mysql_query($sql);
	}
	
	mysql_close();
?>

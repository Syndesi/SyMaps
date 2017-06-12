<?php

echo('<style>* {font-family:raleway;font-weight:400;color:#222;}</style>');


$folder = dirname(__FILE__).'/client';

function getEntrys($folder){
	$entrys = scandir($folder);
	unset($entrys[0]);
	unset($entrys[1]);
	if(in_array('res', $entrys)){
		unset($entrys[array_search('res', $entrys)]);
	}
	$paths = [];
	foreach($entrys as $i => $entry){
		$path = $folder.'/'.$entry;
		if(is_dir($path)){
			$paths = array_merge($paths, getEntrys($path));
		} else {
			$paths[] = $path;
		}
	}
	return $paths;
}

function getNumberOfLines($file){
	return count(file($file));
}

echo('<h2><u>Zeilen je Dokument</u></h2>');

$files = getEntrys($folder);
asort($files);
$linesPerExtension = [];
$allLines = 0;
foreach($files as $i => $file){
	$lines = getNumberOfLines($file);
	$allLines += $lines;

	$pathinfo = pathinfo($file);
	$ext = $pathinfo['extension'];
	if(!array_key_exists($ext, $linesPerExtension)){
		$linesPerExtension[$ext] = 0;
	}
	$linesPerExtension[$ext] += $lines;

	echo($file.': '.$lines.'<br>');
}

arsort($linesPerExtension);
echo('<br><br>');
foreach($linesPerExtension as $ext => $lines){
	$pro = number_format($lines / $allLines * 100, 2, '.', '').'%';
	echo($ext.': '.$lines.' ____('.$pro.')<br>');
}
createBox($linesPerExtension);

echo('<br><br>Gesamt: '.$allLines.' Zeilen');
echo('<br>Dateien: '.count($files));



function createBox($extensions){
	$height = 50;
	$allLines = 0;
	$color = ['#2980B9', '#27AE60', '#34495E', '#E67E22'];
	foreach($extensions as $i => $e){
		$allLines += $e;
	}
	echo('<div style="float:left;width:100%;height:'.$height.'px;border:1px solid gray;background-color:#ECF0F1;overflow:hidden;margin:10px 0px;">');
	$c = 0;
	$ext = array_slice($extensions, 0, 4);
	foreach($ext as $i => $e){
		$w = ($e / $allLines)*100;
		echo('<div style="float:left;width:'.$w.'%;height:'.$height.'px;background-color:'.$color[$c].'">'.$i.'</div>');
		$c++;
	}
	echo('</div>');
}



//header('Content-Type: application/json; charset=utf-8');
//echo(json_encode($files, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
?>
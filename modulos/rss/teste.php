<?php

	require_once 'rss_fetch.inc';

	$url = 'http://www.rcj.com.br/feed.php';
	$rss = fetch_rss($url);

	//echo "Site: ", $rss->channel['title'], "<br>\n";
	foreach ($rss->items as $item){

		$title = $item[title];
		$url   = $item[link];
		echo "<a href=$url>$title</a><br /><br />";

	}

?>
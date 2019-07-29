<?php

function landingPage() {
    $row = QB::table('statistics')->where('id', '=', 1);
    $json = $row->first();
    return json_encode($json,JSON_FORCE_OBJECT);
}


?>
<?php

function addPoints($username, $points) {
    $query = QB::table('users')->where('name', '=', $username);
    $result = $query->first();
    if($result!=null){
        $points = $points+$result->points;
        $data = array(
            'points' => $points
        );

        QB::table('users')->where('name', $username)->update($data);
    }
}
?>
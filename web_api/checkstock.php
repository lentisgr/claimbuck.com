<?php
$result = $query->get();
foreach ($result as $row) {
    $query = QB::table('giftcards')
        ->where('type', '=', $row->type)
        ->where('value', '=', $row->value)
        ->where('points', '=', $row->points)
        ->where('used', '=', 'false');
    if($query->count()==0) {
        QB::table('giftcardtypes')->where('id', $row->id)->update($data = array('instock' => 'false'));
    } else {
        QB::table('giftcardtypes')->where('id', $row->id)->update($data = array('instock' => 'true'));
    }
}
?>
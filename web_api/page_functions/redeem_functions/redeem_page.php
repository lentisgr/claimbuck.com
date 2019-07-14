<?php
function getGiftcards() {
    $query = QB::table('giftcardtypes')->groupBy(array('giftcardtypes.type', 'giftcardtypes.value'));
    $result = $query->get();
    foreach ($result as $object) {
        unset($object->code);
        unset($object->expdate);
        filter_var($object->instock, FILTER_VALIDATE_BOOLEAN);
    }
    return json_encode($result,JSON_FORCE_OBJECT);
}

function decryptCards($cardArray) {

}
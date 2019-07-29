<?php

function addPoints($username, $points) {
    $query = QB::table('users')->where('name', '=', $username);
    $result = $query->first();
    if($result!=null){
        $total = $points+$result->total_points;
        $points = $points+$result->points;
        $c_offers = $result->completed_offers+1;
        $data = array(
            'points' => $points,
            'total_points' => $total,
            'completed_offers' => $c_offers
        );
        QB::table('users')->where('name', $username)->update($data);
        $row = QB::table('statistics')->where('id', '=', 1);
        $offers = $row->first()->completed_offers+1;
        QB::table('statistics')->update(array('completed_offers'=>$offers));
    }
}

function sendWebhook($company,$username,$points,$offer_id,$usd,$offer_title) {
    $url = "https://discordapp.com/api/webhooks/597374343596474379/DLUt-n_5KXYGJUG2PuLYC_9IjoFZ1BOiQ21BAkFR5dSJxfIeJtbOIM1Isj_-5r9lnHsW";
    $company_url = null;

    if($company=='Offertoro') {
        $company_url = "https://www.offertoro.com/";
    } else if ($company=='Adgate') {
        $company_url = "https://adgatemedia.com/";
    }

    $hookObject = json_encode([
        /*
         * The username shown in the message
         */
        "username" => "Claimbuck offers ",
        /*
         * The image location for the senders image
         */
        "avatar_url" => "https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg",
        /*
         * Whether or not to read the message in Text-to-speech
         */
        "tts" => false,

        "embeds" => [
            /*
             * Our first embed
             */
            [
                // Set the title for your embed
                "title" => $company,

                // The type of your embed, will ALWAYS be "rich"
                "type" => "rich",

                // A description for your embed
                "description" => "",

                // The URL of where your title will be a link to
                "url" => $company_url,

                /* A timestamp to be displayed below the embed, IE for when an an article was posted
                 * This must be formatted as ISO8601
                 */
                "timestamp" => date_format(date_create(), 'c'),

                // The integer color to be used on the left side of the embed
                "color" => hexdec( "FFFFFF" ),

                // Footer object
                "footer" => [
                    "text" => "Claimbuck offers"
                ],

                // Thumbnail object
                "thumbnail" => [
                    "url" => "https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg"
                ],

                // Field array of objects
                "fields" => [
                    // Field 1
                    // Field 2
                    [
                        "name" => "Username",
                        "value" => $username,
                        "inline" => false
                    ],

                    [
                        "name" => "Points",
                        "value" => $points,
                        "inline" => false
                    ],
                    // Field 3
                    [
                        "name" => "Payout",
                        "value" => "$".$usd,
                        "inline" => false
                    ],
                    [
                    "name" => "Offer title",
                    "value" => $offer_title,
                    "inline" => false
                    ]
                    ,
                    [
                        "name" => "Offer ID",
                        "value" => $offer_id,
                        "inline" => false
                    ]
                ]
            ]
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

    $ch = curl_init();

    curl_setopt_array( $ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $hookObject,
        CURLOPT_HTTPHEADER => [
            "Length" => strlen( $hookObject ),
            "Content-Type" => "application/json"
        ]
    ]);

    $response = curl_exec( $ch );
    curl_close( $ch );
}

function storePostback($company,$username,$points,$offer_id,$usd,$offer_title) {
    $data = array(
        'username' => $username,
        'company' => $company,
        'points' => $points,
        'payout' => $usd,
        'offer_title' => $offer_title,
        'offer_id' => $offer_id,
        'date' => date('Y-m-d H:i:s')
    );
    QB::table('postbacks')->insert($data);
}

function postbackExists($company,$offer_id) {
    $query = QB::table('postbacks')
        ->where('company','=',$company)
        ->where('offer_id','=',$offer_id);
    if($query->count()>0) {
        return true;
    }
    return false;
}
?>
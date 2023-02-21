<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HogWarpListController extends Controller
{
    public function getJSON(Request $request)
    {

        $url = 'https://list.hogwarp.com/list';

        $response = file_get_contents($url);
        $newsData = json_decode($response);


        return response()->json($newsData);

    }
}

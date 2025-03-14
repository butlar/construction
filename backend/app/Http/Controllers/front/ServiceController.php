<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // This method return all active services

    public function index(){
       $services = Service::where('status',1)->orderBy('created_at','DESC')->get();
       return response()->json([
        'status' => true,
        'data' => $services
        ]);
    }

    // This method return latest active services
    public function latestServices(Request  $request){
        $services = Service::where('status',1)
                    ->take($request->get('limit'))
                    ->orderBy('created_at','DESC')
                    ->get();
        return response()->json([
            'status' => true,
            'data' => $services
            ]);
     }

     // This method return single service by id
    public function service($id){
        $service = Service::where('status',1)->find($id);
            if($service){
                return response()->json([
                    'status' => true,
                    'data' => $service
                    ]);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Service not found'
                    ]);
            }
        }
}
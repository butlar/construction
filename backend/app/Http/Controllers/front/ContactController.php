<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\ContactEmail;

class ContactController extends Controller
{
    public function index(REquest $request)
    {
         
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $mailData=[
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
        ];

         
        
        // using mailtrap.io for testing email functionality.   
        Mail::to('admin@gmail.com')->send( new ContactEmail ($mailData));
        return response()->json([
            'status' => true,
            'message' => 'Thanks For Contacting Us!'
        ]);
    }
}
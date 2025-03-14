<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File ;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;


class TestimonialController extends Controller
{
    //This method will return all testimonials
    public function index()
    {
        $testimonials = Testimonial::OrderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'Testimonials fetched successfully',
            'data' => $testimonials
        ]);
        
    }
    //this method will show single testimonial
    public function show($id)
    {
        $testimonial = Testimonial::find($id);
        if($testimonial == null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found'
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Testimonial fetched successfully',
            'data' => $testimonial
        ]);
    }

    //this method will store a new testimonial
    public function store(Request $request)
    {

       $validator =  Validator::make($request->all(),[
            'testimonial' => 'required',
            'citation' => 'required'
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ]);
        }   
        $testimonial = New Testimonial();
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;   
        $testimonial->designation = $request->designation;   
        $testimonial->save();

        if($request->imageId > 0 ){
            
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$testimonial->id.'.'.$ext;               
                
                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/testimonials/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                // create large thumbnail (1200 x 800)               
                // $destPath = public_path('uploads/testimonials/large/'.$fileName);
                // $manager = new ImageManager(Driver::class);
                // $image = $manager->read($sourcePath);
                // $image->scaleDown(1200);
                // $image->save($destPath);

                $testimonial->image = $fileName;
                $testimonial->save();

                
            }

        }


        return response()->json([
            'status' => true,
            'message' => 'Testimonial stored successfully'
        ]);
    }

    //This method will update the testimonial   
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ]);
        }

        $testimonial = Testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found'
            ]);
        }

        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->designation = $request->designation; 
        $testimonial->status = $request->status; 
        $testimonial->save();

        if ($request->imageId > 0) {
            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;

                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                $testimonial->image = $fileName;
                $testimonial->save();

                if($oldImage != null){
                    File::delete(public_path('uploads/testimonials/' . $oldImage));
                }
            }
             
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial updated successfully'
        ]);
    }

    //This method will delete the testimonial
    Public function destroy($id){
        $testimonial = Testimonial::find($id);
        
        if ($testimonial == null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found'
            ]);
        }

        if($testimonial->image != null){
            File::delete(public_path('uploads/testimonials/' . $testimonial->image));
        }

        $testimonial->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Testimonial deleted successfully'
        ]);
    }

    

    
}
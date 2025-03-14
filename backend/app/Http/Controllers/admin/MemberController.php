<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver; 
use Intervention\Image\ImageManager;

class MemberController extends Controller
{
    //This method will return all members   
    public function index()
    {
        $members = Member::orderBy('created_at', 'Desc')->get();
        return response()->json(
            [
                'status'=> true,
                'message'=> 'Members fetched successfully',            
                'data'=> $members
        ]);
    }

    //This method will return a single member   
    public function show($id)
    {
        $member = Member::orderBy('created_at', 'Desc')->find($id);
        if($member == null){
            return response()->json(
                [
                    'status'=> false,
                    'message'=> 'Member not found'
                ]);
        }
        return response()->json(
            [
                'status'=> true,
                'message'=> 'Member fetched successfully',            
                'data'=> $member
        ]);
    }   

    //This method will create a new member
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(
                [
                    'status'=> false,
                    'message'=> 'Validation Error',
                    'errors'=> $validator->errors()
                ]);
        }
        

        $member = new Member;
        $member->name = $request->name;
        $member->image = $request->image;
        $member->job_title = $request->job_title;
        $member->linkedin = $request->linkedin;
        $member->status = $request->status;
        $member->save();

        if($request->imageId > 0 ){             
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id.'.'.$ext;                
                
                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
                }
        }

        return response()->json([
            'status'=> true,
            'message'=> 'Member created successfully',
            'data'=> $member
        ]);
    }

    //This method will update a member
    public function update(Request $request, $id)
    {
        $member = Member::find($id);
        if($member == null){
            return response()->json(
                [
                    'status'=> false,
                    'message'=> 'Member not found'
                ]);
        }
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(
                [
                    'status'=> false,
                    'message'=> 'Validation Error',
                    'errors'=> $validator->errors()
                ]);
        }
                 
        $member->name = $request->name;        
        $member->job_title = $request->job_title;
        $member->linkedin = $request->linkedin;
        $member->status = $request->status;
        $member->save();

        if($request->imageId > 0 ){
            $oldImage = $member->image; 
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id.'.'.$ext;                
                
                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);
                $member->image = $fileName;
                $member->save();
                }
                if($oldImage!=''){
                    File::delete(public_path('uploads/members/'.$oldImage)); 
                } 
        }

        return response()->json([
            'status'=> true,
            'message'=> 'Member updated successfully',
            'data'=> $member
        ]);
    }   

    //This method will delete a member
    public function destroy($id)
    {
        $member = Member::find($id);
        if($member == null){
            return response()->json(
                [
                    'status'=> false,
                    'message'=> 'Member not found'
                ]);
        }
        $oldImage = $member->image;
        if($oldImage != ''){
            File::delete(public_path('uploads/members/'.$oldImage)); 
        }
        $member->delete();
        return response()->json(
            [
                'status'=> true,
                'message'=> 'Member deleted successfully'
            ]);
    }

    
}
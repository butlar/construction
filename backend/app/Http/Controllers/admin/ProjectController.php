<?php

namespace App\Http\Controllers\admin;

use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    //This method return all projects
    public function index(){
       $projects = Project::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status'=> true,
            'data' => $projects
        ]);
    }

    public function store(Request $request){

        $request->merge(['slug'=>Str::slug($request->slug)]);
        
        $validator = Validator::make($request->all(),[
            'title'=> 'required',
            'slug'=> 'required|unique:projects,slug'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=> false,
                'errors' => $validator->errors()
            ]);
        }

        $project = New Project();
        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type= $request->construction_type;
        $project->sector = $request->sector;
        $project->status = $request->status;
        $project->location = $request->location;
        $project->save();
        

        if($request->imageId > 0 ){
        
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$project->id.'.'.$ext;               
                
                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                // create large thumbnail (1200 x 800)               
                $destPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();

                
            }

        }
        return response()->json([
            'status'=> true,
            'message' => 'Project saved successfully.'
        ]);
    }


    public function update($id,Request $request){
        $project = Project::find($id);
        if($project == null){
            return response()->json([
                'status'=> false,
                'errors' => 'Project not found.'
            ]);
        }
        $request->merge(['slug'=>Str::slug($request->slug)]);
        $validator = Validator::make($request->all(),[
            'title'=> 'required',
            'slug'=> 'required|unique:projects,slug,'.$id.'id'
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status'=> false,
                'errors' => $validator->errors()
            ]);
        }

        $project->title = $request->title;

        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type= $request->construction_type;
        $project->sector = $request->sector;
        $project->status = $request->status;
        $project->location = $request->location;
        $project->save();   

        if($request->imageId > 0){
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$project->id.'.'.$ext;

                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                // create large thumbnail (1200 x 800)               
                $destPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();
            }
            if($oldImage != ''){

                File::delete(public_path('uploads/projects/large/'.$oldImage));
                File::delete(public_path('uploads/projects/small/'.$oldImage));

            }
            
        }
        return response()->json([
            'status'=> true,
            'message'=> 'Project Updated Successfully.'
            ]);
    }

    Public function show($id){
        $project = Project::find($id);
        if($project == null){
            return response()->json([
                'status'=> false,
                'errors' => 'Project not found.'
            ]);
        }
        return response()->json([
            'status'=> true,
            'data' => $project
        ]);
    }

    Public function destroy($id){
        $project = Project::find($id);
        if($project == null){
            return response()->json([
                'status'=> false,
                'errors' => 'Project not found.'
            ]);
        }
        
        $project->delete();
        File::delete(public_path('uploads/projects/large/'.$project->image));
        File::delete(public_path('uploads/projects/small/'.$project->image));
        
        return response()->json([
            'status'=> true,
            'message' => 'Project deleted successfully.'
        ]);
    }
}
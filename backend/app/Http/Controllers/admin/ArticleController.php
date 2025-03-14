<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver; 
use Intervention\Image\ImageManager;

class ArticleController extends Controller
{
    //This method will return the view of the article list
    public function index()
    {
        $articles = Article::OrderBy('created_at', 'desc')->get();
        return response()->json([
            'status'=> true,
            'data' => $articles
        ]);
        // return view('admin.article.index');
    }
    //this method will show single article
    public function show($id)
    {
        $article = Article::find($id);
        if($article == null){
            return response()->json([
                'status'=> false,
                'message' => 'Article not found'
            ]);
        }
        return response()->json([
            'status'=> true,
            'data' => $article
        ]);
    }

    //This method will update the article
    public function update(Request $request, $id)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        
        //Validation
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug'=> 'required|unique:services,slug,' . $id . ',id'
             
        ]);
        
        if($validator->fails()){
            // return redirect()->back()->withErrors($validator)->withInput();
            return response()->json([
                'status'=> false,
                'errors' => $validator->errors()
            ]);
        }

        //Store the article
        $article = Article::find($id);
        if($article == null){
            return response()->json([
                'status'=> false,
                'message' => 'Article not found'
            ]);
        }
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        if($request->imageId > 0 ){
            $oldImage = $article->image; 
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$article->id.'.'.$ext;               
                
                // Create small thumbnail (450 x 300)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($destPath);

                // create large thumbnail (1200 x 800)               
                $destPath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $article->image = $fileName;
                $article->save();                
            }
            if($oldImage != ''){

                File::delete(public_path('uploads/articles/large/'.$oldImage));
                File::delete(public_path('uploads/articles/small/'.$oldImage));

            }


        }
        return response()->json([
            'status'=> true,
            'message' => 'Article updated successfully'
        ]);
    }

    //This method will delete the article
    public function destroy($id)
    {
        $article = Article::find($id);
        if($article == null){
            return response()->json([
                'status'=> false,
                'message' => 'Article not found'
            ]);
        }
        if($article->image != ''){
            File::delete(public_path('uploads/articles/large/'.$article->image));
            File::delete(public_path('uploads/articles/small/'.$article->image));
        }
        $article->delete();
        return response()->json([
            'status'=> true,
            'message' => 'Article deleted successfully'
        ]);
    }

    //This method will return the view of the article create
    public function create()
    {
        return view('admin.article.create');
    }
    
    //This method will store the article
    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        
        //Validation
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|string|max:255|unique:articles,slug'
             
        ]);
        
        if($validator->fails()){
            // return redirect()->back()->withErrors($validator)->withInput();
            return response()->json([
                'status'=> false,
                'errors' => $validator->errors()
            ]);
        }


        //Image upload
        // $imageName = time().'.'.$request->image->extension();  
        // $request->image->move(public_path('images'), $imageName);
        //Store the article
        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        // $article->image = $imageName;
        $article->save();

        if($request->imageId > 0 ){
            
            $tempImage= TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$article->id.'.'.$ext;               
                
                // Create small thumbnail (500 x 600)
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($destPath);

                // create large thumbnail (1200 x 800)               
                $destPath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $article->image = $fileName;
                $article->save();

                

                
            }

        }

        // return redirect()->route('admin.article.index');
        return response()->json([
            'status'=> true,
            'message' => 'Article created successfully'
        ]);
    }
     
}
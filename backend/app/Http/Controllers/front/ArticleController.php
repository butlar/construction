<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //This method will return the view of the article page
    public function index()
    {
        $articles = Article::where('status', 1)
                            ->orderBy('created_at', 'desc')
                            ->get();
                            
        return response()->json([
            "status" => true,
            "data" => $articles
        ]);
    }

    //This method will return the latest articles
    public function latestArticles(Request $request)
    {
        $articles = Article::where('status', 1)
                    ->orderBy('created_at', 'desc')
                    ->limit($request->limit)
                    ->get();

        return response()->json([
            "status" => true,
            "data" => $articles
        ]);
    }

    public function article(    $id)
    {
        $article = Article::find($id);
        if($article == null){
            return response()->json([
                "status" => false,
                "message" => "Article not found"
            ]);
        }
        return response()->json([
            "status" => true,
            "message"=> "Article found",
            "data" => $article
        ]);
    }
     
}
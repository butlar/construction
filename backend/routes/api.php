<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\front\MemberController as FrontMemberController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use League\CommonMark\Extension\SmartPunct\DashParser;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);

// Route::post('services', [ServiceController::class, 'store']);

//Service Route
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-services', [FrontServiceController::class, 'latestServices']);

Route::get('get-service/{id}', [FrontServiceController::class, 'service']);

//Contact Route
Route::post('contact-now',[ContactController::class, 'index']);

//



//

//Project Route
Route::get('get-projects', [FrontProjectController::class, 'index']);
Route::get('get-latest-projects', [FrontProjectController::class, 'latestProjects']);

Route::get('get-project/{id}', [FrontProjectController::class, 'project']);

//Article Route
Route::get('get-articles', [FrontArticleController::class, 'index']);
Route::get('get-latest-articles', [FrontArticleController::class, 'latestArticles']);

Route::get('get-article/{id}', [FrontArticleController::class, 'article']);


//testimonial Route
Route::get('get-testimonials', [FrontTestimonialController::class, 'index']);

//Member Route
Route::get('get-members', [FrontMemberController::class, 'index']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::group(['middleware' => ['auth:sanctum']], function () {
//     //protected Routes
//     Route::get('dashboard', [DashboardController::class, 'index']);
// });

Route::middleware(['auth:sanctum'])->group(function () {
    
    //protected routes
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);
    
    // Service Route
    Route::post('services', [ServiceController::class, 'store']);
    Route::get('services', [ServiceController::class, 'index']);
    Route::put('services/{id}', [ServiceController::class, 'update']);
    Route::get('services/{id}', [ServiceController::class, 'show']);
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);

    // Project Route
    Route::post('projects', [ProjectController::class, 'store']);
    Route::get('projects', [ProjectController::class, 'index']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);

    //Article Route
    Route::post('articles', [ArticleController::class, 'store']);
    Route::get('articles', [ArticleController::class, 'index']);
    Route::put('articles/{id}', [ArticleController::class, 'update']);
    Route::get('articles/{id}', [ArticleController::class, 'show']);
    Route::delete('articles/{id}', [ArticleController::class, 'destroy']);

    //Testimonial 
    Route::post('testimonials', [TestimonialController::class, 'store']);
    Route::get('testimonials', [TestimonialController::class, 'index']);
    Route::put('testimonials/{id}', [TestimonialController::class, 'update']);
    Route::get('testimonials/{id}', [TestimonialController::class, 'show']);
    Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);
    

    //Member Route
    Route::post('members', [MemberController::class, 'store']);
    Route::get('members', [MemberController::class, 'index']);
    Route::get('members/{id}', [MemberController::class, 'show']);
    Route::put('members/{id}', [MemberController::class, 'update']);
    Route::delete('members/{id}', [MemberController::class, 'destroy']);

    // temp_image
    Route::post('temp-images', [TempImageController::class, 'store']);
    
});
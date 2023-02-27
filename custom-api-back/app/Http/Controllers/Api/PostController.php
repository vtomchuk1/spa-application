<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Post;
use App\Models\Models\Usert;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $posts = Post::all();

        return $posts;
    }

    public function sort($params)
    {
        $post = Post::query()
            ->where('id', '=', $params)
            ->with('user')
            ->get();

        return $post;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Post
     */
    public function store(Request $request)
    {
        $post = new Post;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Post
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Post
     */
    public function update(Request $request, Post $post)
    {
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response(null, 204);
    }
}

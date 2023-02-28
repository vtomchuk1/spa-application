<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Post;
use App\Models\Models\Usert;
use http\Client\Curl\User;
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

    public function sort($params, $flag)
    {
        if($params == 'email' || $params == 'username') {
            $posts = Post::join('userts', 'userts.id', '=', 'posts.user_id')
                ->orderBy('userts.'.$params, $flag)
                ->with('user')
                ->select('posts.*')
                ->get();
        }
        else {
            $posts = Post::query()
                ->orderBy($params, $flag)
                ->with('user')
                ->get();
        }
        return $posts;
    }

    public function show_reply($id){

        $posts = Post::query()
            ->where('reply', '=', $id)
            ->with('user')
            ->get();

        return $posts;
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

        $user_email = $request->data['email'];
        $user_username = $request->data['username'];

        $user = Usert::query()
            ->where('email', '=', $user_email)
            ->where('username', '=', $user_username)
            ->first();

        $post->user_id = $user->id;

        if(isset($request->data['title']))
            $post->title =  $request->data['title'];
        else
            $post->title = null;

        if(isset($request->data['reply']))
            $post->reply = $request->data['reply'];
        else
            $post->reply = null;

        $post->body = $request->data['body'];
        $post->save();

        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     */
    public function show($id)
    {
        $posts = Post::query()
            ->where('id', '=', $id)
            ->with('user')
            ->first();
        return $posts;
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

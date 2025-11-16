<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {
    public function TaskCreate( Request $request ) {
        $data = $request->validate( [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:pending,completed,in-progress',
            'priority'    => 'required|in:low,medium,high',
        ] );

        $task = Task::create( [
            'user_id'     => $request->user()->id,
            'title'       => $data['title'],
            'description' => $data['description'],
            'status'      => $data['status'],
            'priority'    => $data['priority'],
        ] );

        return response()->json( ['message' => 'Task Created Successfully', 'status' => true, 'data' => $task] );
    }
}

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

    public function TaskUpdate( Request $request, $id ) {
        $data = $request->validate( [
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status'      => 'sometimes|required|in:pending,completed,in-progress',
            'priority'    => 'sometimes|required|in:low,medium,high',
        ] );

        $task = Task::where( 'id', $id )
            ->where( 'user_id', $request->user()->id )
            ->first();

        // If task not found, return error
        if ( !$task ) {
            return response()->json( [
                'message' => 'Task Not Found',
                'status'  => false,
            ], 404 );
        }

        $task->update( $data );

        return response()->json( ['message' => 'Task Updated Successfully', 'status' => true, 'data' => $task] );
    }

    public function TaskDelete( Request $request, $id ) {
        $task = Task::where( 'id', $id )
            ->where( 'user_id', $request->user()->id )
            ->first();

        $task->delete();

        return response()->json( ['message' => 'Task Deleted Successfully', 'status' => true, 'data' => $task] );
    }
}

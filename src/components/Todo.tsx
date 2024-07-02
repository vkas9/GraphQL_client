import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_TODO } from "../graphql/mutation";
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")

    const [addTodo] = useMutation(ADD_TODO, {
        optimisticResponse: {
            addTodo: {
                id: uuidv4(),
                title: title,
                completed:false,
                tags: tags.split(",").map((tag) => tag.trim())
            }
        },
        update: (cache, { data: addTodo }) => {
            console.log("addTodo", addTodo)
        }
    })
    const handleFormSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        addTodo({
            variables:{
                title,
                tags:tags.split(",").map((tag)=>tag.trim())
            }
        })
    }
    return <div>
        <h1>GraphQL Powered Todo App</h1>
        <form  className="flex flex-col gap-4" onSubmit={handleFormSubmit}>

            <input type="text"
                value={title}
                placeholder="Add a new todo"

                onChange={(e) => setTitle(e.target.value)} />

            <input type="text"
                value={tags}
                placeholder="Add tags separated by commas"

                onChange={(e) => setTags(e.target.value)} />
                <button type="submit">Submit</button>

        </form>

    </div>
}

export default Todo;
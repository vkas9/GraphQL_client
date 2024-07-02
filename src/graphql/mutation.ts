import {gql} from "@apollo/client"

export const ADD_TODO=gql`

    mutation addingTodos($title:String!,$tags:[String]!){
        addTodo(title:$title,tags:$tags){
            id
            title
            tags
        }
    }

`
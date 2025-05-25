import { FormEvent, useState } from 'react'
import { useWatchTodosTodoCreated, useWriteTodosCreateTodo } from './generated'
import { config } from './wagmi'
import { contractAddress } from './contractAddr'


function CreateTodoForm() {
    useWatchTodosTodoCreated({
        config: config,
        address: contractAddress,
        onLogs(logs) {
            console.log('Event says "created a todo"', logs)
        }
    })

    const [todoTitle, setTodoTitle] = useState<string>("");
    const [todoDescription, setTodoDescription] = useState<string>("")
    const {writeContractAsync} = useWriteTodosCreateTodo({
        config: config
    })

    const submitCreateTodo = async (e: FormEvent) => {
        e.preventDefault();
        await writeContractAsync({
            address: contractAddress,
            args: [todoTitle, todoDescription]
        })
        setTodoTitle("")
        setTodoDescription("")
    }
  return (
    <>
        <form onSubmit={(e) => submitCreateTodo(e)}>
            <input type="text" name='todo-title' value={todoTitle}
                placeholder='Todo Title'
                onChange={e => setTodoTitle(e.target.value)}/>
            <textarea 
                name="todo-description"
                rows={5}
                placeholder="What's on your mind?"
                value={todoDescription}
                onChange={e => setTodoDescription(e.target.value)} />
            <button type='submit'>Submit New Todo</button>
        </form>
    </>
  )
}

export default CreateTodoForm
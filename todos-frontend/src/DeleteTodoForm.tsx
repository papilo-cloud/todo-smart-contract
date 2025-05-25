import { FormEvent, useState } from "react";
import { useWatchTodosTodoDeleted, useWriteTodosDeleteTodo } from "./generated";
import { config } from "./wagmi";
import { contractAddress } from "./contractAddr";


function DeleteTodoForm() {
	useWatchTodosTodoDeleted({
    	config: config,
    	address: contractAddress,
    	onLogs(logs) {
        	console.log('Event says "deleted a todo"', logs)
    	}
	})
	const [todoId, setTodoId] = useState<number>(0);
	const { writeContractAsync } = useWriteTodosDeleteTodo({
    	config: config
	})

	const submitDeleteTodo = async (e: FormEvent) => {
    	e.preventDefault();

    	await writeContractAsync(
        	{
            	address: contractAddress,
            	args: [BigInt(todoId)]
        	}
    	)
    	setTodoId(0);
	}
	return (<>
    	<form onSubmit={(e) => submitDeleteTodo(e)}>
        	<input type="number" name="todo-id" value={todoId} placeholder='Todo ID' onChange={(e) => setTodoId(Number.parseInt(e.target.value))} />
        	<button type="submit">Delete Todo By ID</button>
    	</form>
	</>)
}

export default DeleteTodoForm
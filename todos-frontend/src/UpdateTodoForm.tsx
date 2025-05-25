import { FormEvent, useState } from "react";
import { useWatchTodosTodoUpdated, useWriteTodosUpdateTodo } from "./generated";
import { contractAddress } from "./contractAddr";
import { config } from "./wagmi";

function UpdateTodoForm() {
	useWatchTodosTodoUpdated({
    	config: config,
    	address: contractAddress,
    	onLogs(logs) {
        	console.log('Event says "updated a todo"', logs)
    	},
	});
	const [todoId, setTodoId] = useState<number>(0);
	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDescription, setTodoDescription] = useState<string>("");
	const { writeContractAsync } = useWriteTodosUpdateTodo(
    	{
        	config: config
    	}
	);
	const submitUpdateTodo = async (e: FormEvent
	) => {
    	e.preventDefault();

    	await writeContractAsync({
        	address: contractAddress,
        	args: [BigInt(todoId), todoTitle, todoDescription]
    	});

    	setTodoTitle("");
    	setTodoDescription("");
    	setTodoId(0);

	}
	return (<>
    	<form onSubmit={(e) => submitUpdateTodo(e)}>
        	<input type="number" name="todo-id" value={todoId} placeholder='Todo ID' onChange={(e) => setTodoId(Number.parseInt(e.target.value))} />
        	<input type="text" name="todo-title" value={todoTitle} placeholder='Todo Title' onChange={(e) => setTodoTitle(e.target.value)} />
        	<textarea
            	rows={5}
            	name="todo-description"
            	placeholder="Update your todo here."
            	value={todoDescription}
            	onChange={(e) =>
                	setTodoDescription(e.target.value)
            	}
        	/>
        	<button type="submit">Submit Updated Todo</button>
    	</form>
	</>)
}

export default UpdateTodoForm
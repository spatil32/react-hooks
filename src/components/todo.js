import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = (props) => {
	const [ todoText, setTodo ] = useState('');
	const [ todoList, addTodoList ] = useState([]);

	useEffect(() => {
		axios
			.get('https://fir-1e64f.firebaseio.com/todos.json')
			.then((res) => {
				console.log(res);
				const todosData = res.data;
				const todos = [];
				for (let key in todosData) {
					todos.push({ id: key, text: todosData[key].text });
				}
				addTodoList(todos);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onchangeHandler = (event) => {
		setTodo(event.target.value);
	};

	const onclickHandler = () => {
		addTodoList(todoList.concat(todoText));
		axios
			.post('https://fir-1e64f.firebaseio.com/todos.json', { text: todoText })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<input type="text" placeholder="Add Todo" onChange={onchangeHandler} value={todoText} />
			<button type="button" onClick={onclickHandler}>
				Add
			</button>
			<ul>{todoList.map((todo) => <li key={todo.id}>{todo.text}</li>)}</ul>
		</React.Fragment>
	);
};

export default todo;

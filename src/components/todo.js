import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';
import List from './list';
import useFormsInput from '../hooks/forms';

const todo = (props) => {
	// const [ todoText, setTodo ] = useState('');
	// const inputElRef = useRef();
	// const [ inputValid, setInputValid ] = useState('');
	const todoInput = useFormsInput();
	const todoListReducer = (state, action) => {
		switch (action.type) {
			case 'ADD':
				return state.concat(action.payload);
			case 'SET':
				return action.payload;
			case 'REMOVE':
				return state.filter((todo) => todo.id !== action.payload);
			default:
				return state;
		}
	};
	const [ todoList, dispatch ] = useReducer(todoListReducer, []);

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
				dispatch({ type: 'SET', payload: todos });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const mouseMoveHandler = (e) => {
		console.log(e.clientX, e.clientY);
	};

	// useEffect(() => {
	// 	document.addEventListener('mousemove', mouseMoveHandler);

	// 	return () => {
	// 		console.log('clean up');
	// 		document.removeEventListener('mousemove', mouseMoveHandler);
	// 	};
	// });

	// const onchangeHandler = (event) => {
	// 	setTodo(event.target.value);
	// };

	const onclickHandler = () => {
		// use for useRef
		// const todoText = inputElRef.current.value;

		// use for custom hooks
		const todoText = todoInput.value;
		axios
			.post('https://fir-1e64f.firebaseio.com/todos.json', { text: todoText })
			.then((res) => {
				dispatch({ type: 'ADD', payload: { id: res.data.name, text: todoText } });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const removeListItem = (todoId) => {
		axios
			.delete(`https://fir-1e64f.firebaseio.com/todos/${todoId}.json`)
			.then((res) => {
				dispatch({ type: 'REMOVE', payload: todoId });
			})
			.catch((err) => console.log(err));
	};

	// const inputValidation = (event) => {
	// 	if (event.target.value.trim() === '') setInputValid(false);
	// 	else setInputValid(true);
	// };

	return (
		<React.Fragment>
			{/** Uncomment to try custom effect */}
			<input
				type="text"
				placeholder="Add Todo"
				onChange={todoInput.onChange}
				value={todoInput.value}
				style={{ backgroundColor: todoInput.validity === true ? 'transparent' : 'maroon' }}
			/>
			{/** Uncomment to try useRef */}
			{/* <input
				ref={inputElRef}
				type="text"
				placeholder="Add Todo"
				onChange={inputValidation}
				style={{ backgroundColor: inputValid ? 'transparent' : 'maroon' }}
			/> */}
			{/** Uncomment to try useState, useEffect */}
			{/* <input type="text" placeholder="Add Todo" onChange={onchangeHandler} value={todoText} /> */}
			<button type="button" onClick={onclickHandler}>
				Add
			</button>
			{useMemo(() => <List item={todoList} onClick={removeListItem} />, [ todoList ])}
		</React.Fragment>
	);
};

export default todo;

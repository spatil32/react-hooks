import React, { useState } from 'react';
import Todo from './components/todo';
import Header from './components/header';
import Auth from './components/auth';
import AuthContext from './auth-context';

const app = (props) => {
	const [ component, setComponent ] = useState('auth');
	const [ authStatus, setAuthStatus ] = useState(false);

	const clickTodos = () => {
		setComponent('todos');
	};

	const clickAuth = () => {
		setComponent('auth');
	};

	const login = () => {
		setAuthStatus(true);
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ status: authStatus, loginStatus: login }}>
				<Header onclickTodos={clickTodos} onclickAuth={clickAuth} />
				<hr />
				{component === 'todos' ? <Todo /> : <Auth />}
			</AuthContext.Provider>
		</div>
	);
};

export default app;

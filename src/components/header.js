import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const header = (props) => {
	const auth = useContext(AuthContext);
	return (
		<header>
			{auth.status ? <button onClick={props.onclickTodos}>TO DO</button> : null}
			<button onClick={props.onclickAuth}>Auth</button>
		</header>
	);
};

export default header;

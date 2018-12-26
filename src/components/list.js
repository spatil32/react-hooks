import React from 'react';

const list = (props) => {
	console.log('rendering list...');
	return (
		<ul>
			{props.item.map((todo) => (
				<li key={todo.id} onClick={() => props.onClick(todo.id)}>
					{todo.text}
				</li>
			))}
		</ul>
	);
};

export default list;

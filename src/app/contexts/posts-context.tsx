'use client';

import React, { PropsWithChildren, useState } from "react";

export const PostsContext = React.createContext<any>({
	state: {},
	update: null
});

export default function PostsContextProvider({ children }: PropsWithChildren<{}>) {
	const [state, setState] = useState({
		posts: [],
		postToEdit: null,
	});

	function updaterFunction(arg: Partial<typeof state> | ((previous: Partial<typeof state>) => Partial<typeof state>)) {
		let newState: any = state;
		if (typeof arg === 'function') {
			newState = arg(state);
		} else {
			newState = arg;
		}

		setState({ ...state, ...newState });
	}

	return <PostsContext.Provider value={{ state, updaterFunction }}>
		{children}
	</PostsContext.Provider>
}

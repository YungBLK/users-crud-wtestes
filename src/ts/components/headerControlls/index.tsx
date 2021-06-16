import React from "react";

// types
import PropsInterface from "./types";

const HeaderControlls = (props: PropsInterface) => {
	return (
		<div>
			<button type="button" onClick={() => props.onCreate("register")}>
				Adicionar
			</button>
		</div>
	);
};

export default HeaderControlls;

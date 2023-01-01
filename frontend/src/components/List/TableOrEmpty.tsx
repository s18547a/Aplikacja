import { ReactElement } from 'react';

function TableOrEmpty({
	Empty,
	children,
}: {
	Empty: boolean;
	children: JSX.Element;
}): ReactElement {
	if (Empty) {
		return <div className="alert alert-info "> Brak wyników</div>;
	} else {
		return children;
	}
}

export default TableOrEmpty;

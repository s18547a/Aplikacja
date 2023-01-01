import { ReactElement } from 'react';

function HomePageNavigation({
	onChange,
	selected,
}: {
	onChange: (any) => void;
	selected: string;
}): ReactElement {
	function onChangeTabFunction(e) {
		const { name, value } = e.target;
		onChange(value);
	}
	return (
		<ul className="nav nav-pills border-0">
			<li className="nav-item ">
				<button
					className={selected == 'login' ? 'nav-link active' : 'nav-link'}
					value="login"
					onClick={onChangeTabFunction}
				>
					Logowanie
				</button>
			</li>
			<li className="nav-item">
				<button
					className={selected == 'sch' ? 'nav-link active' : 'nav-link'}
					value="sch"
					onClick={onChangeTabFunction}
				>
					Godziny otwarcia
				</button>
			</li>
			<li className="nav-item">
				<button
					className={selected == 'register' ? 'nav-link active' : 'nav-link'}
					value="register"
					onClick={onChangeTabFunction}
				>
					Zarejestruj
				</button>
			</li>
		</ul>
	);
}

export default HomePageNavigation;

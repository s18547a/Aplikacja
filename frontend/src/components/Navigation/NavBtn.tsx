import { ReactElement, useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import { hoverElement } from '../AdditionalStyles/NavigationAdditionalStyles';

function NavBtn(props: { link: string; label: string }): ReactElement {
	const location = useLocation().pathname;
	console.log(location);
	const [style, setStyle] = useState({});
	return (
		<div
			className="border"
			style={style}
			onMouseEnter={() => setStyle(hoverElement)}
			onMouseLeave={() => setStyle({})}
		>
			<li>
				<a
					className={
						location == '/'
							? 'text-decoration-none btn btn-group-toggle '
							: 'text-decoration-none btn btn-group-toggle'
					}
					aria-current="page"
					href={props.link}
				>
					<h5> {props.label}</h5>
				</a>
			</li>
		</div>
	);
}

export default NavBtn;

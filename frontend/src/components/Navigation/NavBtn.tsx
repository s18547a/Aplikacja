import { PersonFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';

function NavBtn(props: { link: string; label: string }) {
	const location = useLocation().pathname;
	console.log(location);

	return (
		<li className="border-primary">
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
	);
}

export default NavBtn;

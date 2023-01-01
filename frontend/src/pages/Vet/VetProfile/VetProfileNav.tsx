import { ReactElement } from 'react';

function VetProfileNav({
	onChange,
	activeTab,
}: {
	onChange: (any) => void;
	activeTab: string;
}): ReactElement {
	return (
		<ul className="nav nav-pills  row justify-content-center mb-3">
			<div className="col-auto">
				<li>
					<button
						className={activeTab == '' ? 'nav-link active ' : 'nav-link'}
						value={''}
						onClick={onChange}
					>
						Profil
					</button>
				</li>
			</div>
			<div className="col-auto">
				<li>
					<button
						className={activeTab == 'res' ? 'nav-link active' : 'nav-link'}
						value={'res'}
						onClick={onChange}
					>
						Dziesiejsze rezerwacje
					</button>
				</li>
			</div>
		</ul>
	);
}

export default VetProfileNav;

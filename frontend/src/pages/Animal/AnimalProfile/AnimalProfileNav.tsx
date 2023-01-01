import { ReactElement } from 'react';

function AnimalProfileNav({
	activeTab,
	setSelectedTab,
}: {
	activeTab: string;
	setSelectedTab: (any) => void;
}): ReactElement {
	function setSelectedTabFunction(e) {
		setSelectedTab(e);
	}

	return (
		<ul className="nav nav-pills border-0 row justify-content-center mb-5">
			<div className="col-lg-auto ">
				<li className="nav-item">
					<button
						className={activeTab == '' ? 'nav-link active' : 'nav-link'}
						value={''}
						onClick={setSelectedTabFunction}
					>
						Profil
					</button>
				</li>
			</div>
			<div className="col-lg-auto">
				<li className="nav-item">
					<button
						className={activeTab == 'ill' ? 'nav-link active' : 'nav-link '}
						value={'ill'}
						onClick={setSelectedTabFunction}
					>
						Choroby
					</button>
				</li>
			</div>
			<div className="col-lg-auto">
				<li className="nav-item">
					<button
						className={activeTab == 'add' ? 'nav-link active' : 'nav-link '}
						value={'add'}
						onClick={setSelectedTabFunction}
					>
						Informacje medyczne
					</button>
				</li>
			</div>
			<div className="col-lg-auto">
				<li className="nav-item">
					<button
						className={activeTab == 'vacc' ? 'nav-link active' : 'nav-link '}
						value={'vacc'}
						onClick={setSelectedTabFunction}
					>
						Szczepienia
					</button>
				</li>
			</div>
		</ul>
	);
}

export default AnimalProfileNav;

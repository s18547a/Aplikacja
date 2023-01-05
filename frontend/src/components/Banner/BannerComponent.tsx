import { useEffect, useState } from 'react';
import { DoorClosed } from 'react-bootstrap-icons';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';

import ModalEnableBtn from '../Modal/ModalEnableBtn';
import { getCurrentUser, isAuthenticated } from '../../utils/authHelper';
import { getDefalutProfileImage, getLogo } from '../../utils/imageHelper';
import { getUserName, isManager, isOwner, isVet } from '../../utils/userType';

function BannerComponent(props) {
	function handleLogout() {
		props.handleLogout();
	}

	let logoutBtn: JSX.Element = (
		<div>
			<ModalEnableBtn
				label="Wyloguj"
				className="btn btn-danger"
				id={'logoutModal'}
				icon={<DoorClosed className="me-2" />}
			/>
		</div>
	);

	const [userType, setUserType] = useState<string>('');

	useEffect(() => {
		if (isAuthenticated()) {
			if (isOwner()) {
				setUserType('Właściciel');
			} else if (isVet() && !isManager()) {
				setUserType('Weterynarz');
			} else if (isManager()) {
				setUserType('Menadżer');
			}
		}
	}, []);

	const loggedUser = (): JSX.Element => {
		return isAuthenticated() ? (
			<>
				<Modal
					label={'Czy na pewno?'}
					function={handleLogout}
					id={'logoutModal'}
				/>

				<nav
					className="nav navbar-dark shadow "
					style={{
						background: '#3373C4',
						width: '100%',
						height: '100%',
						position: 'sticky',
						top: 0,
					}}
				>
					<div
						className="row justify-content-between"
						style={{ width: '100%' }}
					>
						<div className="col-lg-6 ">
							<div className="row">
								<div className="col-2">
									<img height="75px" width="100px" src={getLogo()} />
								</div>
							</div>
						</div>
						<div className="col-lg-6   row justify-content-end">
							<div className="col-auto">
								<img
									height="75px"
									width="75px"
									className="  collapsed"
									src={
										getCurrentUser().ProfileImage == null
											? getDefalutProfileImage()
											: getCurrentUser().ProfileImage
									}
									style={{ borderRadius: 90 }}
									role="button"
									id="bannerDropdown"
									data-bs-toggle="collapse"
									data-bs-target="#dropdownBanner"
									aria-expanded="false"
								/>
							</div>

							<div className="col-auto align-self-center ">
								<div className="d-flex flex-column">
									<p className="text-white fw-bold">{`${getUserName()}`}</p>
									<p className=" text-white fw-bold">{` ${
										getCurrentUser().Email
									}`}</p>
								</div>
							</div>

							<div className="col-auto align-self-center">{logoutBtn}</div>
						</div>
					</div>
				</nav>
			</>
		) : (
			<nav
				className=" nav navbar-dark  sticky-top d-flex justify-content-center aling-items-center shadow"
				style={{ background: '#3373C4', height: '100%', width: '100%' }}
			>
				<div className="row align-content-center">
					<div className="col-6 ">
						<img height="75px" width="100px" src={getLogo()} />
					</div>
					<div className="col-6">
						<div
							className="col-6  d-flex justify-content-center"
							style={{ color: 'white' }}
						>
							<h4 className=" display-5">Klinka </h4>
							<h4 className="display-5"> Vet</h4>
						</div>
					</div>
				</div>
			</nav>
		);
	};

	return loggedUser();
}

export default BannerComponent;

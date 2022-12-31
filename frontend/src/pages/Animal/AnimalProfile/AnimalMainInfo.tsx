import { useNavigate } from 'react-router-dom';
import EditButton from '../../../components/Buttons/EditButton';
import { getDefalutProfileImage } from '../../../components/other/imageHelper';
import ProfileDiv from '../../../components/other/ProfileDiv';

function AnimalProfile(props) {
	const navigate = useNavigate();

	return (
		<div className="">
			<div className="row justify-content-center">
				<div className="col-lg-4 col-12">
					<div className=" card card-body border-0 shadow">
						<div className="row justify-content-center">
							<div className="col-12 ms-4">
								<img
									height="400px"
									width="350px"
									src={
										props.animal?.ProfileImage == null
											? getDefalutProfileImage()
											: props.animal.ProfileImage
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-12 justify-content-center">
					<div className="row">
						<div className="col-10">
							<div className="row justify-content-center ">
								<div className="col-lg-12 col-10 card card-body border-0 shadow ms-5">
									<div className="row">
										<div className="col-5">
											<div className="card-title">
												<h5>Informacje główne</h5>
											</div>
										</div>
										<div className="col-1   ">
											<EditButton
												onClick={() =>
													navigate(`/animals/${props.animal?.AnimalId}/edit`, {
														state: { AnimalId: props.animal?.AnimalId },
													})
												}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-12">
											<ProfileDiv label={'Imie'} value={props.animal?.Name} />
										</div>
										<div className="col-12">
											<ProfileDiv
												label={'Data urodzenia'}
												value={props.animal?.BirthDate}
											/>
										</div>
										<div className="col-12">
											<ProfileDiv
												label={'Rasa'}
												value={`${props.animal?.AnimalType?.Race},${props.animal?.AnimalType?.Family}`}
											/>
										</div>

										<div className="col-12">
											<ProfileDiv
												label={'Płeć'}
												value={
													props.animal?.Sex == 1
														? 'Samiec'
														: props.animal?.Sex == 2
														? 'Samica'
														: 'Nieokreślono'
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-8 mt-5">
							<div className=" row justify-content-center">
								<div className="col-lg-12 col-10 card card-body border-0 shadow ms-5">
									<div className="card-title">
										<h5>Informacje właściciela</h5>
									</div>
									<div className="row">
										<div className="col-12">
											<ProfileDiv
												label={'Właściciel'}
												value={`${props.owner?.Name} ${props.owner?.LastName}`}
											/>
										</div>
										<div className="col-12">
											<ProfileDiv label={'Email'} value={props.owner?.Email} />
										</div>
										<div className="col-12">
											<ProfileDiv
												label={'Telefon'}
												value={props.owner?.Contact}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnimalProfile;

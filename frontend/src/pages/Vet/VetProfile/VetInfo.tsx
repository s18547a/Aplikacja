import { useNavigate } from 'react-router-dom';
import Vet from '../../../classes/Vet';
import EditButton from '../../../components/Buttons/EditButton';
import { spaceContact } from '../../../utils/contactHelper';
import { getDefalutProfileImage } from '../../../utils/imageHelper';
import ProfileDiv from '../../../components/Profile/ProfileDiv';
import { VetTypeI } from '../VetRegister/VetForm';

function VetInfo({ vet, types }: { vet: Vet; types: VetTypeI[] }) {
	const specString = (): string => {
		let specString: string = '';
		types.forEach((type, index) => {
			if (index == types.length - 1) {
				specString = specString + type.VetType;
			} else {
				specString = specString + type.VetType + ', ';
			}
		});

		return specString;
	};
	const navigate = useNavigate();
	return (
		<div className="row justify-content-center">
			<div className="col-lg-4 ">
				<div className="row  card card-body border-0 shadow">
					<div className="col-12  ">
						<img
							height="250px"
							width="250px"
							className=" card-img-top"
							src={
								vet.ProfileImage == null
									? getDefalutProfileImage()
									: vet.ProfileImage
							}
						/>
					</div>
				</div>
			</div>

			<div className="ms-lg-3 col-lg-7  ">
				<div className="row card card-body shadow ">
					<div className="col-12">
						<div className="row mb-3">
							<div className="col-5">
								<div className="card-title">
									<h5>Główne informacje</h5>
								</div>
							</div>
							<div className="col-3">
								<EditButton
									onClick={() =>
										navigate(`/vets/${vet?.VetId}/edit`, {
											state: { VetId: vet?.VetId },
										})
									}
								/>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12">
								<ProfileDiv label={'Imie'} value={vet.Name} />
								<ProfileDiv label={'Nazwisko'} value={vet.LastName} />
								<ProfileDiv
									label={'Kontakt'}
									value={spaceContact(vet.Contact)}
								/>
								<ProfileDiv label={'Email'} value={vet.Email} />
								<ProfileDiv label={'Zatrudniono'} value={vet.HireDate} />
								<ProfileDiv label={'Specjalizacje'} value={specString()} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetInfo;

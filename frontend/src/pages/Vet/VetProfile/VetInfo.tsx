import { useNavigate } from 'react-router-dom';
import Vet from '../../../classes/Vet';
import EditButton from '../../../components/Buttons/EditButton';
import { spaceContact } from '../../../components/other/contactHelper';
import { getDefalutProfileImage } from '../../../components/other/imageHelper';
import ProfileDiv from '../../../components/other/ProfileDiv';

function VetInfo({ vet }: { vet: Vet }) {
	const navigate = useNavigate();
	return (
		<div className="">
			<div className="row align-items-center">
				<div className="col-lg-4 ">
					<div className="row ">
						<div className="col-12 card card-body border-0 shadow p-4 ">
							<img
								height="250px"
								width="250px"
								className=""
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetInfo;

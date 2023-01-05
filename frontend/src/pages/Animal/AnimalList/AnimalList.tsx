import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getAnimalsbyOwner,
	getAnimals,
	getAnimalsByOwnerEmail,
} from '../../../apiCalls/animalApiCalls';
import Animal from '../../../classes/Animal';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/List/RegisterSuccessInfo';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isOwner, isVet, isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../Shared/ServerErrorInfoComponent';

import AnimalSearch from './AnimalSearch';

function AnimalList(): ReactElement {
	const [animals, setAnimalList] = useState<Animal[]>([]);

	const navigate = useNavigate();
	const [empty, setEmpty] = useState<boolean>(false);

	const location = useLocation();
	const [newId, setNewId] = useState('');

	const [pagedList, setPagedList] = useState<Animal[][]>([]);
	const [selectedPage, setSelectedPage] = useState<number>(0);
	const [serverError, setServerError] = useState(false);

	const divideListIntoPages = (visitList: Animal[]) => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Animal[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Animal[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};

	useEffect(() => {
		const loadAnimals = async () => {
			let promise;
			let response;
			if (isOwner()) {
				promise = getAnimalsbyOwner(getCurrentUser().userTypeId);
			} else if (isVet() || isManager()) {
				promise = getAnimals();
			}
			if (promise) {
				promise
					.then((data) => {
						response = data;

						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								divideListIntoPages(data);
								setAnimalList(data);
							}
							if (response.status == 500) {
								setServerError(true);
							}
							if (response.status == 404) {
								setEmpty(true);
							}
						},
						(error) => {
							console.log(error);
							setServerError(true);
						}
					);
			}
		};

		loadAnimals();

		const state = location.state as { id: string };
		if (state != null) {
			setNewId(state.id);
		}
	}, []);

	async function handleSearch(Email) {
		let results;

		if (Email != '') {
			await getAnimalsByOwnerEmail(Email)
				.then((res) => {
					results = res;
					return res.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setEmpty(false);
							divideListIntoPages(data);
							setAnimalList(data);
							navigate('/animals');
						}
						if (results.status == 404) {
							setEmpty(true);
							navigate('/animals');
						}
						if (results.status == 500) {
							setServerError(serverError);
						}
					},
					(error) => {
						console.log(error);
						setServerError(serverError);
					}
				);
		}
	}

	const changePage = (e) => {
		e.preventDefault();
		const { value } = e.target;
		setSelectedPage(value);
	};

	return (
		<div className="container">
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[{ label: 'Zwierzęta', active: true, link: '/animals' }]}
					/>
				</div>
			</div>
			<RegiserSuccessInfo newId={newId} message={'Zarejestrowane zwierzę: '} />
			{isVet() ? <AnimalSearch onSearch={handleSearch} /> : null}
			<div className="card card-body mt-4 shadow">
				<h5>Zwierzęta</h5>
				<div>
					<div>
						<TableOrEmpty Empty={empty}>
							<table className="table table-hover ">
								<thead>
									<tr>
										<th>Imie</th>
										<th>Rasa</th>
										<th>Data urodzenia</th>
										<th>Właściciel</th>
									</tr>
								</thead>
								<tbody>
									{pagedList[selectedPage]?.map((animal) => {
										return (
											<tr
												key={animal.AnimalId}
												onClick={() => {
													navigate('/animals/' + animal.AnimalId);
												}}
											>
												<td>{animal.Name}</td>
												<td>
													{animal.AnimalType?.Family +
														',' +
														animal.AnimalType?.Race}
												</td>
												<td>{animal.BirthDate}</td>
												<td>{animal?.Owner.Email}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</TableOrEmpty>
					</div>
				</div>
			</div>
			<Pagination
				pagedList={pagedList}
				selectedPage={selectedPage}
				changePage={changePage}
				setSelectedPage={setSelectedPage}
			/>
		</div>
	);
}

export default AnimalList;

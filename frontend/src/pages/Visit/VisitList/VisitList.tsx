import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getVisitList,
	getVisitListByOwner,
	searchVisitList,
} from '../../../apiCalls/visitApiCalls';
import Visit from '../../../classes/Visit';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/List/RegisterSuccessInfo';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../components/other/authHelper';
import { VisitListParamter } from '../../../components/other/helperClass/VisitListParameters';
import { isVet, isManager, isOwner } from '../../../components/other/userType';

import SearchInput from '../../Shared/SearchImput';
import ServerErrorInfoComponenet from '../../Shared/ServerErrorInfoComponent';
import VisitSearch from '../../Shared/VisitSearch';

function VisitList() {
	const [visitList, setVisitList] = useState<Visit[]>([]);
	const [empty, setEmpty] = useState<boolean | undefined>(undefined);

	const navigate = useNavigate();
	const [newId, setNewId] = useState('');
	const location = useLocation();

	const [pagedList, setPagedList] = useState<Visit[][]>([]);
	const [selectedPage, setSelectedPage] = useState<number>(0);

	const [serverError, setServerError] = useState(false);

	const divideListIntoPages = (visitList: Visit[]) => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Visit[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Visit[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};

	const loadVisits = async () => {
		let promise;
		let response;
		const curretUserId = getCurrentUser().userTypeId;
		if (isVet() || isManager()) {
			promise = getVisitList();
		}
		if (isOwner()) {
			promise = getVisitListByOwner(curretUserId);
		}
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setVisitList(data);
							setEmpty(false);
							divideListIntoPages(data);
						}
						if (response.status == 404) {
							setEmpty(true);
						}
						if (response.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						console.log(error);
						setServerError(true);
					}
				);
		}
	};

	useEffect(() => {
		loadVisits();

		const state = location.state as { id: string };
		if (state != null) {
			setNewId(state.id);
		}
	}, []);

	async function handleSearch(paramters: VisitListParamter) {
		let results;

		if (paramters.allUndefined()) {
			await searchVisitList(paramters)
				.then((res) => {
					results = res;
					return res.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setEmpty(false);
							setVisitList(data);
							divideListIntoPages(data);
							navigate('/visits');
						}
						if (results.status == 404) {
							setEmpty(true);
							navigate('/visits');
						}
						if (results.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						console.log(error);
						setServerError(true);
					}
				);
		}
	}

	const changePage = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setSelectedPage(value);
	};

	return (
		<div className="container">
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[{ label: 'Wizyty', active: true, link: '' }]}
					/>
				</div>
			</div>
			<div className="row">
				<RegiserSuccessInfo newId={newId} message={'Nowa wizyta: '} />
			</div>
			<div className="row align-items-center">
				<div className="col-12">
					<VisitSearch onSearch={handleSearch} />
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card card-body shadow mt-5">
						<h5 className="card-title">Wizyty</h5>
						<TableOrEmpty Empty={empty}>
							<table className="table table-hover ">
								<thead>
									<tr>
										<th>Data</th>
										<th>Zwierzę</th>
										<th>Weterynarz</th>
									</tr>
								</thead>

								<tbody>
									{pagedList[selectedPage]?.map((visit) => {
										return (
											<tr
												key={visit.VisitId}
												onClick={() => {
													navigate('/visits/' + visit.VisitId);
												}}
											>
												<td>{visit.Date}</td>
												<td>{visit.Animal.Name}</td>
												<td>{`${visit.Vet.Name} ${visit.Vet.LastName}`}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</TableOrEmpty>
					</div>

					<Pagination
						pagedList={pagedList}
						selectedPage={selectedPage}
						changePage={changePage}
						setSelectedPage={setSelectedPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default VisitList;

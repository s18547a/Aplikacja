import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getReservationsByOwner } from '../../../api/reservationApiCalls';
import { getSurgeries, searchSurgeryList } from '../../../api/surgeryApiCalls';
import Surgery from '../../../classes/Surgery';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/List/RegisterSuccessInfo';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../components/other/authHelper';
import { VisitListParamter } from '../../../components/other/helperClass/VisitListParameters';
import { isVet, isManager, isOwner } from '../../../components/other/userType';
import VisitSearch from '../../Shared/VisitSearch';

function SurgeryList() {
	const navigate = useNavigate();
	const location = useLocation();

	const [message, setMessage] = useState({
		id: '',
		message: '',
	});

	const [surgeryList, setSurgeryList] = useState<Surgery[]>([]);

	const [empty, setEmpty] = useState<boolean>(false);

	const [pagedList, setPagedList] = useState<Surgery[][]>([]);
	const [selectedPage, setSelectedPage] = useState<number>(0);

	const divideListIntoPages = (visitList: Surgery[]) => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Surgery[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Surgery[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};
	async function loadSurgeryList() {
		const currentUserId = getCurrentUser().userTypeId;

		let response;
		let promise;

		if (isVet() || isManager()) {
			promise = getSurgeries();
		}
		if (isOwner()) {
			promise = getReservationsByOwner(currentUserId);
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
							setSurgeryList(data);
							divideListIntoPages(data);
							setEmpty(false);
						}
						if (response.status == 404) {
							setEmpty(true);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	useEffect(() => {
		loadSurgeryList();

		const state = location.state as { id: string };
		if (state != null) {
			setMessage(() => ({
				id: state.id,
				message: 'Nowy zabieg',
			}));
		}
	}, []);

	const changePage = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setSelectedPage(value);
	};

	async function handleSearch(paramters: VisitListParamter) {
		let results;

		if (paramters.allUndefined()) {
			await searchSurgeryList(paramters)
				.then((res) => {
					results = res;
					return res.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setEmpty(false);
							setSurgeryList(data);
							divideListIntoPages(data);
						}
						if (results.status == 404) {
							setEmpty(true);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[{ label: 'Zabiegi', active: true, link: '' }]}
					/>
				</div>
			</div>
			<div className="row">
				<RegiserSuccessInfo newId={message.id} message={message.message} />
			</div>
			<div className="row align-items-center">
				<div className="col-12">
					<VisitSearch onSearch={handleSearch} />
				</div>
			</div>
			<div className="card card-body shadow mt-5">
				<h5 className="card-title">Zabiegi</h5>
				<TableOrEmpty Empty={empty}>
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Weterynarz</th>
								<th>Data</th>
								<th>Godzina</th>
								<th>Rodzaj</th>
								<th>Zwierzę</th>
							</tr>
						</thead>

						<tbody>
							{pagedList[selectedPage]?.map((surgery) => {
								return (
									<tr
										onClick={() => {
											navigate(`/surgeries/${surgery.SurgeryId}`);
										}}
									>
										<td>{`${surgery.Vet.Name} ${surgery.Vet.LastName}`}</td>
										<td>{surgery.Date}</td>
										<td>{surgery.StartTime}</td>
										<td>{surgery.SurgeryType}</td>
										<td>{surgery.Animal.Name}</td>
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
	);
}

export default SurgeryList;

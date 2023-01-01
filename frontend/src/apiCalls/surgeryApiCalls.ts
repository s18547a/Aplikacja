import Vet from '../classes/Vet';
import { getCurrentDate } from '../components/other/getCurrentDate';
import { SearchListParamter } from '../components/other/helperClass/VisitListParameters';

const baseUrl = 'http://localhost:8000/surgeries';

export async function getSurgery(surgeryId) {
	const url = `${baseUrl}/${surgeryId}`;

	const promise = await fetch(url);
	return promise;
}

export async function getSurgeries() {
	const promise = await fetch(baseUrl);

	return promise;
}

export async function getSurgeriesByOwner(OwnerId: string) {
	const ulr = `${baseUrl}?OwnerId=${OwnerId}`;

	const promise = await fetch(ulr);

	return promise;
}

export async function searchSurgeryList(paramters: SearchListParamter) {
	const queryURL = paramters.createURLString();
	console.log(queryURL);
	const url = `${baseUrl}/search${paramters.createURLString()}`;

	const promise = await fetch(url);

	return promise;
}

export async function getTodaySurgeries(VetId) {
	const url = `${baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;

	const promise = await fetch(url);

	return promise;
}

export async function getSurgeryTypes() {
	const url = `${baseUrl}/types`;

	const promise = await fetch(url);
	return promise;
}

export async function registerSurgery(surgery) {
	const surgeryString = JSON.stringify(surgery);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: surgeryString,
	};

	const promise = await fetch(baseUrl, options);
	return promise;
}

export async function updateSurgeryReport(surgeryReport, ReportSurgeryId) {
	const url = `${baseUrl}/${ReportSurgeryId}/report`;

	const surgeryReportBodyString = JSON.stringify({
		SurgeryId: ReportSurgeryId,
		Report: surgeryReport,
	});

	const options = {
		method: 'Put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: surgeryReportBodyString,
	};

	const promise = await fetch(url, options);
	return promise;
}

export async function cancelSurgery(SurgeryId) {
	const url = `${baseUrl}/${SurgeryId}`;
	const options = {
		method: 'DELETE',
	};

	const promise = await fetch(url, options);

	return promise;
}

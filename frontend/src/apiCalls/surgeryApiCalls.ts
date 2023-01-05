import Vet from '../classes/Vet';
import { createHTTDeleteOptions, createHttpGetOptions, createHTTPPostOptions, createHTTPutOptions } from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { getCurrentDate } from '../utils/getCurrentDate';
import { isVet } from '../utils/userType';
import { SearchListParamter } from '../utils/VisitListParameters';

const baseUrl = 'http://localhost:8000/surgeries';

export async function getSurgery(surgeryId) {
	const url = `${baseUrl}/${surgeryId}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(url,options);
	return promise;
}

export async function getSurgeries() {
	const options=createHttpGetOptions(isVet())
	const promise = await fetch(baseUrl,options);
	

	return promise;
}

export async function getSurgeriesByOwner(OwnerId: string) {
	const ulr = `${baseUrl}?OwnerId=${OwnerId}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(ulr,options);

	return promise;
}

export async function searchSurgeryList(paramters: SearchListParamter) {
	const queryURL = paramters.createURLString();
	console.log(queryURL);
	const url = `${baseUrl}/search${paramters.createURLString()}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(url,options);

	return promise;
}

export async function getTodaySurgeries(VetId) {
	const url = `${baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;
	const options=createHttpGetOptions(isVet())
	const promise = await fetch(url,options);


	return promise;
}

export async function getSurgeryTypes() {
	const url = `${baseUrl}/types`;
	const options=createHttpGetOptions(isVet())
	const promise = await fetch(url,options);
	return promise;
}

export async function registerSurgery(surgery) {
	const surgeryString = JSON.stringify(surgery);
	
	const options=createHTTPPostOptions(isVet(),surgeryString)

	const promise = await fetch(baseUrl, options);
	return promise;
}

export async function updateSurgeryReport(surgeryReport, ReportSurgeryId) {
	const url = `${baseUrl}/${ReportSurgeryId}/report`;

	const surgeryReportBodyString = JSON.stringify({
		SurgeryId: ReportSurgeryId,
		Report: surgeryReport,
	});

	

	const options=createHTTPutOptions(isVet(),surgeryReportBodyString)

	const promise = await fetch(url, options);
	return promise;
}

export async function cancelSurgery(SurgeryId) {
	const url = `${baseUrl}/${SurgeryId}`;
	const options =createHTTDeleteOptions(isVet());

	const promise = await fetch(url, options);

	return promise;
}

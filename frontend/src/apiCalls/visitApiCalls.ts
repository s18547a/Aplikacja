import { createHttpGetOptions, createHTTPPostOptions } from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { isVet } from '../utils/userType';
import { SearchListParamter } from '../utils/VisitListParameters';

const baseURL = 'http://localhost:8000/visits';

export async function getVisitList() {
	const options=createHttpGetOptions(isVet());
	const promise = await fetch(baseURL,options);
	
	return promise;
}

export async function getVisitListByOwner(OwnerId) {
	const url = `${baseURL}?OwnerId=${OwnerId}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(url,options);
	return promise;
}

export async function getVisitById(VisitId) {
	const url = `${baseURL}/${VisitId}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(url,options);

	return promise;
}

export async function searchVisitList(paramters: SearchListParamter) {
	const queryURL = paramters.createURLString();
	console.log(queryURL);
	const url = `${baseURL}/search${paramters.createURLString()}`;
	const options=createHttpGetOptions(isAuthenticated())
	const promise = await fetch(url,options);

	return promise;
}

export async function registerVisit(Visit) {
	const stringVisit = JSON.stringify(Visit);

	const options=createHTTPPostOptions(isVet(),stringVisit);
	console.log('SENDED');
	const promise = await fetch(baseURL, options);

	return promise;
}

export async function getMedicalAtivities() {
	const url = 'http://localhost:8000/visits/activities';

	const options=createHttpGetOptions(isVet());

	const promise = await fetch(url,options);

	return promise;
}

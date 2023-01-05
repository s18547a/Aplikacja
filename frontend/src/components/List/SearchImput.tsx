import { ReactElement } from 'react';

function SearchInput({
	onChange,
	handleSearch,
	placeholder,
}: {
	onChange: (any) => void;
	handleSearch: (any) => void;
	placeholder: string;
}): ReactElement {
	function onChangeFunction(e) {
		onChange(e);
	}

	function handleSearchFuntion(e) {
		handleSearch(e);
	}

	return (
		<div className="input-group justify-content-center">
			<div className="row">
				<div className="col-12 ">
					<div className="input-group">
						<input
							onChange={onChangeFunction}
							className="form-control rounded"
							placeholder={placeholder}
							aria-label="Search"
							aria-describedby="search-addon"
						/>
						<button
							type="button"
							className="btn btn-outline-primary bg-white"
							onClick={handleSearchFuntion}
						>
							Szukaj
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchInput;

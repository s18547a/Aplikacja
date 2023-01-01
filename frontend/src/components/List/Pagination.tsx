import { ReactElement } from 'react';

function Pagination({
	pagedList,
	selectedPage,
	changePage,
	setSelectedPage,
}): ReactElement {
	return (
		<div className="mt-4 ">
			<nav aria-label="mt -5">
				<ul className="pagination ">
					<li className="page-item">
						<button
							className="page-link"
							disabled={selectedPage == 0}
							onClick={() => {
								setSelectedPage(selectedPage - 1);
							}}
						>
							&laquo;
						</button>
					</li>

					{pagedList.map((page) => {
						return (
							<li
								className={
									pagedList.indexOf(page) == selectedPage
										? 'page-item active'
										: 'page-item'
								}
							>
								<button
									className="page-link"
									value={pagedList.indexOf(page)}
									onClick={changePage}
								>
									{pagedList.indexOf(page) + 1}
								</button>
							</li>
						);
					})}
					<li className="page-item ">
						<button
							className="page-link"
							disabled={selectedPage + 1 == pagedList.length}
							onClick={() => {
								const newPage = Number.parseInt(selectedPage) + 1;
								setSelectedPage(newPage);
							}}
						>
							&raquo;
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Pagination;

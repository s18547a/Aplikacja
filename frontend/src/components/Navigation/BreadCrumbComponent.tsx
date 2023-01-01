interface BreadCrumbType {
	label: string;
	active: boolean;
	link: string;
}
function BreadCrumbComponent(props: { elements: BreadCrumbType[] }) {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{props.elements.map((element) => {
					return element.active ? (
						<li className={' breadcrumb-item active'} aria-current="page">
							<a>{element.label}</a>
						</li>
					) : (
						<li className={' breadcrumb-item'}>
							<a href={element.link}>{element.label}</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

export default BreadCrumbComponent;
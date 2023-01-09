function VetSpec({ types }: { types: { VetType: string }[] }) {
	function specHelper() {
		let specString = '';
	}
	return (
		<div className="card">
			<div className="card-body">
				<div className="card-title">
					<h5>Specjalizacje</h5>
					{types.map((type) => {
						return <div>{type.VetType}</div>;
					})}
				</div>
			</div>
		</div>
	);
}

export default VetSpec;

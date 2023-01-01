function VetSpec({ types }: { types: { VetType: string }[] }) {
	return (
		<div className="mt-2 mb-2">
			<div className="row">
				<div className="col-lg-12">
					<div className="row">
						{types.map((type) => {
							return (
								<div className="col-lg-3 text-center">
									<div className="card card-body shadow">{type.VetType}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetSpec;

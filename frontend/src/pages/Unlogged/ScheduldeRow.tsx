function ScheduldeRow({
	label,
	day,
}: {
	label: string;
	day: string | null | undefined;
}) {
	return (
		<div className="row ">
			<div className="col-6">
				<p>{label}</p>
			</div>
			<div className="col-6">
				<p>{day == null ? 'Zamknięte' : day}</p>
			</div>
		</div>
	);
}

export default ScheduldeRow;

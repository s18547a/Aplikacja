import { useState } from 'react';
import { prototype } from 'stream';

function SurgeryReportForm({
	onChange,
	value,
}: {
	onChange: (any) => void;
	value: string;
}) {
	const [report, setReport] = useState('');

	function onReportChange(e) {
		onChange(e);
	}

	return (
		<div>
			<textarea
				className="form-control"
				onChange={onReportChange}
				value={value}
				rows={10}
			/>
		</div>
	);
}

export default SurgeryReportForm;

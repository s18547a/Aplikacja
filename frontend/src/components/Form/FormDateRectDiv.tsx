import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { ReactElement, useState } from 'react';
function FormDateReactDiv(props): ReactElement {
	const [counter, setCounter] = useState(0);
	function onChange(e) {
		const date: string = e.toISOString().split('T')[0];
		const ot = new Date(date);
		ot.setDate(ot.getDate() + 1);
		const otD = ot.toISOString().split('T')[0];
		//const newDate = ot.toISOString().split('T')[0];
		if (props.filter) {
			if (counter == 0) {
				props.onChange(ot);
				setCounter(1);
			} else props.onChange(date);
		} else {
			props.onChange(otD);
		}

		console.log(date);
		console.log(otD);
	}

	return (
		<div className="form-group">
			<div className="row">
				<div className="col-12">
					<label className="form-label ">{props.label}</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<DatePicker
								className={
									props.error == ''
										? 'form-select '
										: 'form-select border border-danger'
								}
								onChange={onChange}
								filterDate={props.filter}
								locale={pl}
								name="date"
								value={props.value}
								dateFormat="yyyy-MM-dd"
								showMonthDropdown
								showYearDropdown
								selected={props.selected}
								onKeyDown={(e) => {
									e.preventDefault();
								}}
								disabled={props.disabled}
								minDate={new Date(props.min)}
							/>
						</div>

						<div className="col-12">
							<label className="form-text text-danger ">{props.error}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FormDateReactDiv;

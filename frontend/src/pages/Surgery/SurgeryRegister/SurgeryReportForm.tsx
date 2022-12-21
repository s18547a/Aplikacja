import { useState } from "react";
import { prototype } from "stream";

function SurgeryReportForm(props) {
  const [report, setReport] = useState("");

  function onReportChange(e) {
    props.onChange(e);
  }

  return (
    <div>
      <textarea
        className="form-control"
        onChange={onReportChange}
        value={props.value}
        rows={10}
      />
    </div>
  );
}

export default SurgeryReportForm;
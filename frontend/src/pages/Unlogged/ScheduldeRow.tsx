function ScheduldeRow(props) {
  return (
    <div className="row ">
      <div className="col-6">
        <p>{props.label}</p>
      </div>
      <div className="col-6">
        <p>{props.day == null ? "Zamknięte" : props.day}</p>
      </div>
    </div>
  );
}

export default ScheduldeRow;

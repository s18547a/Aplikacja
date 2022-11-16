function RegiserSuccessInfo(props) {
  return (
    <div>
      {props.newId != "" ? (
        <div className="alert alert-success ">
          {props.message}
          {props.newId}
        </div>
      ) : null}
    </div>
  );
}

export default RegiserSuccessInfo;

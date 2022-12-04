function ProfileDiv(props) {
  return (
    <div className="row ">
      <div className="col-6">
        <p className=" ">{props.label}</p>
      </div>
      <div className="col-6">
        <p className="text-muted" style={{ color: "black" }}>
          {props.value}
        </p>
      </div>
    </div>
  );
}

export default ProfileDiv;

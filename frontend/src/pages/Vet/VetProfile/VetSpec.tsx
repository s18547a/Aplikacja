function VetSpec(props) {
  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-lg-3">
          <div className="card card-body card-title shadow">
            <h5 className="text-center">Specjalizacje</h5>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="row">
            {props.types.map((type) => {
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

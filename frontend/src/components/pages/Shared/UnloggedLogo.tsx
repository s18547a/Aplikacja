import { getLogo } from "../../other/imageHelper";

function UnloggedLogo(props) {
  return (
    <div className="row">
      <div className="col-6">
        <img src={getLogo()} height={"150"} />
      </div>
      <div className="col-6">
        <div className="row ">
          <div className="col-3">
            <h1 style={{ color: "black" }}>Klinika Vet</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnloggedLogo;

import { useEffect, useState } from "react";

function PhotoForm(props) {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string>();
  const [editModeStart, setEditModeStart] = useState(false);

  function handleImage(event) {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) == "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let pr = reader.result as string;
        setPreview(pr);

        props.setPhoto(pr);
      };

      reader.readAsDataURL(image);
    } else if (props.editForm) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let pr = reader.result as string;
        setPreview(pr);

        props.setPhoto(pr);
      };
    } else {
      setPreview(undefined);
    }
  }, [image]);

  return (
    <div className="card card-body shadow">
      <div className="card-title">
        <h5>Zdjęcie profilowe</h5>
      </div>
      <div className="row">
        <div className="col-12">
        <div className="row justify-content-center">
          <div className="col-10">
          <input style={{width:"300px"}} type={"file"} accept={"image/*"} onChange={handleImage} className="form-control "/>
          </div>
          </div>
        <div className="row justify-content-center">
          <div className="col-10">
          <img width="300px" height="300px " src={props.preview} className=""/>
          </div>

        </div>
       
        
       

      
     </div>

       
      </div>
    </div>
  );
}

export default PhotoForm;

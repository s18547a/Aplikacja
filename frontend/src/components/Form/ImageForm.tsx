function ImageForm(props) {
  function handleImageUpload(e) {
    props.handleImageUpload(e);
  }

  return (
    <div>
      <img width="250px" height="250px " src={props.preview} />

      <input
        type={"file"}
        accept={"image/*"}
        onChange={handleImageUpload}
        className={"form-control"}
      />
    </div>
  );
}

export default ImageForm;

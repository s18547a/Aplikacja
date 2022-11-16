function TableOrEmpty(props) {
  if (props.Empty) {
    return <div className="alert alert-info "> Brak wyników</div>;
  } else {
    return props.children;
  }
}

export default TableOrEmpty;

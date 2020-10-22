import React from "react";
import ItemForm from "../components/Forms/ItemForm";
import NavMain from "../components/NavMain";

const ItemEdit = (props) => {
  // console.log("========", props);
  return (
    <div>
      <ItemForm action="edit" id={props.match.params.id} />
      <NavMain page="item" />
    </div>
  );
};

export default ItemEdit;

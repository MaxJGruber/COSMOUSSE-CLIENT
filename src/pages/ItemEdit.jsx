import React from "react";
import ItemForm from "../components/Forms/ItemForm";
import NavMain from "../components/NavMain";

const ItemEdit = (props) => {
  // console.log("========", props);
  return (
    <div>
      <div className="upperScreen">
        <ItemForm action="edit" id={props.match.params.id} />
      </div>
      <NavMain page="item" />
    </div>
  );
};

export default ItemEdit;

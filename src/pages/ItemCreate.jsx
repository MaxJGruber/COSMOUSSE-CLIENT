import React from "react";
import ItemForm from "../components/Forms/ItemForm";
import NavMain from "../components/NavMain";

const ItemCreate = (props) => {
  return (
    <div>
      <ItemForm coordinates={props.coordinates} />
      <NavMain page="item"/>
    </div>
  );
};

export default ItemCreate;

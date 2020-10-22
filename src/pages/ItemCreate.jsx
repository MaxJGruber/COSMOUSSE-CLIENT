import React from "react";
import ItemForm from "../components/Forms/ItemForm";
import NavMain from "../components/NavMain";

const ItemCreate = (props) => {
  return (
    <div>
      <div className="upperScreen">
      <ItemForm coordinates={props.coordinates} />
      </div>
      <NavMain page="item"/>
    </div>
  );
};

export default ItemCreate;

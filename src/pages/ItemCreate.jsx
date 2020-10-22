import React from "react";
import ItemForm from "../components/Forms/ItemForm";
import NavMain from "../components/NavMain";
import "../styles/global.css";

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

import React, { Component } from "react";
import API from "../../api/apiHandler";
import AutoComplete from "../AutoComplete";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { buildFormData } from "../../utils";
import { UserContext } from "../Auth/UserContext";
import "../../styles/Form.css";

export class ItemForm extends Component {
  static contextType = UserContext;
  state = {
    name: "",
    brand: "",
    type: null,
    rating: null,
    location: "",
    description: "",
    isCraft: false,
    image: "",
    added_by: "",
  };

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;
    console.log(key, value);

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.type) {
      this.setState({ error: "No type selected !" }, () => {
        this.timeoutId = setTimeout(() => {
          this.setState({ error: null });
        }, 1000);
      });
      return;
    }

    const fd = new FormData();
    buildFormData(fd, this.state);

    API.createOne("/item/create", fd)
      .then((dbRes) => {
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.context);
    console.log(">>>>>", this.props);
    return (
      <div className="signup-page">
        <div className="signup-form-container">
          <form className="Form" onChange={this.handleChange}>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" />
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" name="brand" />
            <div className="form-group">
              <label className="label" htmlFor="type">
                Type
              </label>
              <select name="type" id="type" defaultValue="-1">
                <option value="-1" disabled>
                  Select a type
                </option>
                <option value="blonde">Blonde</option>
                <option value="stout">Stout</option>
                <option value="pale ale">Pale Ale</option>
                <option value="ipa">IPA</option>
                <option value="cider">Cider</option>
                <option value="wheat beer">Wheat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="isCraft">Is it a Craft Beer?</label>
              <input type="checkbox" name="isCraft" id="isCraft" />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="location">
                Address
              </label>
              <AutoComplete onSelect={this.handlePlace} />
            </div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" />
            <label htmlFor="priceHH">Happy Hour Price</label>
            <input type="number" id="priceHH" name="priceHH" />
            <div className="form-group">
              <label className="label" htmlFor="rating">
                Rating
              </label>
              <input type="radio" name="rating" value="0" />0
              <input type="radio" name="rating" value="1" />1
              <input type="radio" name="rating" value="2" />2
              <input type="radio" name="rating" value="3" />3
              <input type="radio" name="rating" value="4" />4
              <input type="radio" name="rating" value="5" />5
            </div>

            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea type="text" id="description" name="description" />
            <div className="option-btns">
              <button id="delete" onClick={this.deleteItem}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button id="save" onClick={this.handleSubmit}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ItemForm);

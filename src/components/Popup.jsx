import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import "../styles/Popup.css";
import { Link } from "react-router-dom";

function formatDate(date) {
  return date.toString().substring(0, 15);
}

const Popup = (props) => {
  return (
    <div className="Popup">
      <Card className="Popup-card">
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={props.properties.image}
            alt={props.properties.name}
          />
          <Card.Header>{props.properties.name}</Card.Header>
          <Card.Meta>{props.properties.location.formattedAddress}</Card.Meta>
          <Card.Description>
            Added: {formatDate(new Date(props.properties.createdAt))}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              <Link to={`item/${props.properties._id}/editpage`}>View</Link>
            </Button>
            <Button basic color="red" onClick={() => props.onCancel()}>
              Close
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Popup;

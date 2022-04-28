import Card from "react-bootstrap/Card";

function generateCard(launch) {
  let launchStatus = { color: "", text: "" };

  if (launch.success) {
    launchStatus.color = "text-success"
    launchStatus.text = "Successful"
  } else if (!launch.success && launch.upcoming) {
    launchStatus.color = "text-primary"
    launchStatus.text = "Upcoming"
  } else {
    launchStatus.color = "text-danger"
    launchStatus.text = "Failed"
  }

  return (
    <Card key={launch.name} style={{ width: "18rem" }} className="mb-3">
      <Card.Img variant="top" src={launch.links.patch.small ? launch.links.patch.small : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></Card.Img>
      <Card.Body>
        <Card.Title>{launch.name}</Card.Title>
        <Card.Subtitle className={launchStatus.color}>
          {launchStatus.text}
        </Card.Subtitle>
        <Card.Subtitle>{launch.date_utc}</Card.Subtitle>
        <Card.Text>{launch.details ? launch.details : "No details available"}</Card.Text>
      </Card.Body>
    </Card>
  );
}

const Launches = function (props) {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {props.launches.map((launch) => {
        return generateCard(launch);
      })}
    </div>
  );
};

export default Launches;

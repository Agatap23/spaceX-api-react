import Card from "react-bootstrap/Card";
import '../styles/launches.css'

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

  const launchDate = new Date(launch.date_utc)

  return (
    <Card key={launch.name} className="mb-3 launch-card">
      <Card.Img variant="top" src={launch.links.patch.small ? launch.links.patch.small : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></Card.Img>
      <Card.Body>
        <Card.Title className="mb-2">{launch.name}</Card.Title>
        <Card.Subtitle className={launchStatus.color + " mb-2"}>
          {launchStatus.text}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2">{launchDate.toDateString()}</Card.Subtitle>
        <div className="launch-card_text">
        <Card.Text>{launch.details ? launch.details : "No details available"}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

const Launches = function (props) {
  if(props.launches.length) {
    return (
      <div className="d-flex flex-wrap justify-content-around">
        {props.launches.map((launch) => {
          return generateCard(launch);
        })}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">No matching results</div>
    )
  }
};

export default Launches;

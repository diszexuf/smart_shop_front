import {Card} from "react-bootstrap";

function Review(props) {
    const {name, reviewText} = props;

    return(
        <Card style={{ width: '18rem', height: 400, borderRadius: 50, padding: 10 }} className='m-3'>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {reviewText}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Review;
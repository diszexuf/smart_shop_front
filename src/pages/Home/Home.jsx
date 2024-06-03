import {Container, Carousel, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import advertisImg1 from './Huawei_Mate_20lite_717x351_new_v2.jpg'
import advertisImg2 from './laptop_discount.jpg'
import advertisImg3 from './1n04fhhk.jpg'
import './Home.css'


function Home() {

    return (
        <Container>
            <div className="container mt-4">
                <Carousel fade>
                    <Carousel.Item>
                        <Image src={advertisImg3} alt="First slide" className="carousel-image" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={advertisImg1} alt="Second slide" className="carousel-image"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={advertisImg2} alt="Third slide" className="carousel-image"/>
                    </Carousel.Item>
                </Carousel>

                <h2 className="my-4">Featured Products</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 1"/>
                            <div className="card-body">
                                <h5 className="card-title">Product 1</h5>
                                <p className="card-text">Short description of the product.</p>
                                <a href="#" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 2"/>
                            <div className="card-body">
                                <h5 className="card-title">Product 2</h5>
                                <p className="card-text">Short description of the product.</p>
                                <a href="#" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 3"/>
                            <div className="card-body">
                                <h5 className="card-title">Product 3</h5>
                                <p className="card-text">Short description of the product.</p>
                                <a href="#" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Container>


    )
}


export default Home;
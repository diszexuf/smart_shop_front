import {Container, Carousel, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import advertisImg1 from './Frame 8.svg'
import advertisImg2 from './Frame 9.svg'
import advertisImg3 from './Frame 10.svg'
import './Home.css'
import ProductCard from "../../components/ProductCard/ProductCard.jsx";


function Home() {

    return (
        <Container className='min-vh-100'>
            <div className="container mt-5">
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


                <div className="row mb-5 mt-5">
                    <h2 className="my-4">Рекомендуемые продукты</h2>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <ProductCard productId={567} brand="Asus" model="ZenFone" price="76 000"/>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <ProductCard productId={567} brand="Osmos" model="VitriG" price="45 0000"/>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <ProductCard productId={567} brand="Xiaomi" model="14 Ultra" price="60 000"/>
                        </div>
                    </div>

                </div>
            </div>


        </Container>


    )
}


export default Home;
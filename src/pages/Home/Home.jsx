import {Container, Carousel, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import advertisImg1 from './Frame 8.svg'
import advertisImg2 from './Frame 9.svg'
import advertisImg3 from './Frame 10.svg'
import './Home.css'
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Review from "./Review.jsx";


function Home() {
    const reviews = [
        {
            name: "Дмитрий Смирнов",
            reviewText: "Я всегда покупаю свою мобильную технику в SmartShop. Здесь всегда широкий выбор товаров, и цены всегда конкурентные. Кроме того, персонал всегда готов помочь и ответить на любые вопросы. Я очень доволен своим последним покупкой - смартфон Samsung Galaxy S21 Ultra, и я рекомендую SmartShop всем своим друзьям и коллегам."
        },
        {
            name: "Анна Носкова",
            reviewText: "Я впервые зашел в SmartShop, и я был приятно удивлен. Магазин очень чистый и хорошо организованный, и персонал был очень вежлив и профессиональен. Я купил новые беспроводные наушники Apple AirPods Pro, и я очень доволен своей покупкой. Я рекомендую SmartShop всем, кто ищет качественную мобильную технику и хорошее обслуживание."
        },
        {
            name: "Ян Кузнецов",
            reviewText: "Я купил новый смартфон Xiaomi Mi 11 в SmartShop, и я очень доволен своей покупкой. Цена была очень конкурентной, и персонал был очень вежлив и профессиональен. Кроме того, я получил бесплатную защитную пленку и чехол для моего смартфона. Я рекомендую SmartShop всем, кто ищет качественную мобильную технику и хорошее обслуживание."
        },
    ]

    return (
        <Container className='min-vh-100'>
            <div className="container mt-5">
                <Carousel fade>
                    <Carousel.Item>
                        <Image src={advertisImg3} alt="First slide" className="carousel-image"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={advertisImg1} alt="Second slide" className="carousel-image"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={advertisImg2} alt="Third slide" className="carousel-image"/>
                    </Carousel.Item>
                </Carousel>

                <div style={{marginTop: '10%'}}>
                    <h1>Отзывы наших покупателей</h1>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        {reviews.map((review, index) => (
                            <Review key={index} name={review.name} reviewText={review.reviewText}/>
                        ))}
                    </div>
                </div>

                <div className="mt-5 mb-5">
                    <h1>О нашей компании</h1>
                    <div style={{fontSize: 20}} className="text-start mt-4">
                        <p>
                            Добро пожаловать в <b>SmartShop</b>, ваш надежный и инновационный магазин мобильной техники!
                        </p>
                        <p>
                            Мы гордимся тем, что предоставляем нашим клиентам широкий ассортимент мобильных устройств,
                            аксессуаров и решений от ведущих мировых брендов. В нашем магазине вы найдете смартфоны,
                            умные часы, беспроводные наушники и многое другое.
                        </p>
                        <p>
                            Наша команда профессионалов всегда готова помочь вам выбрать оптимальное решение, исходя из
                            ваших предпочтений и бюджета. Мы регулярно обновляем наш ассортимент, следим за новинками и
                            трендами в области мобильной техники, чтобы вы всегда были в курсе событий и могли
                            приобрести самое передовое устройство.
                        </p>
                        <p>
                            <b>Наша миссия</b> - предоставить вам качественную мобильную технику и выдающееся
                            обслуживание. Спасибо, что выбираете SmartShop, и мы надеемся, что вы станете нашим
                            постоянным клиентом и другом!
                        </p>
                        <p>
                            С уважением,
                            Команда <b>SmartShop</b>
                        </p>
                    </div>
                </div>
            </div>


        </Container>


    )
}


export default Home;
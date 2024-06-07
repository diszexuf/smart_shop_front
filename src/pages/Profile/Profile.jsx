import {Container} from "react-bootstrap";
import UserProfile from "../../components/UserProfile/UserProfile.jsx";
import OrderList from "../../components/orderList/OrderList.jsx";
import {useEffect, useState} from "react";

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchUserData() {

            const userData = await fetchUserFromAPI();
            const userOrders = await fetchOrdersFromAPI();

            setUser(userData);
            setOrders(userOrders);
        }

        fetchUserData();
    }, []);

    async function fetchUserFromAPI() {
        // todo дописать получение данных с бэка
        return {
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            phone: '+7 123 456 7890'
        };
    }

    const fetchOrdersFromAPI = async () => {
        // Здесь вызовите ваше API для получения списка заказов
        return [
            {id: '123', date: '2023-05-01', status: 'Доставлен', total: '1500'},
            {id: '124', date: '2023-05-02', status: 'В обработке', total: '2000'}
        ];
    };

    const handleUpdateUser = async (updatedUser) => {
        // Обновите данные пользователя через API
        setUser(updatedUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/sign_in';
    };

    return (
        <Container className='mt-3 d-flex justify-content-between'>
            <UserProfile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout}/>
            <OrderList orders={orders}/>
        </Container>
    );
}

export default Profile;
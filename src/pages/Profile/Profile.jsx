import {Container} from "react-bootstrap";
import UserProfile from "../../components/UserProfile/UserProfile.jsx";
import OrderList from "../../components/orderList/OrderList.jsx";
import {useEffect, useState} from "react";

function Profile() {
    const [user, setUser] = useState({
        fullName: '',
        username: '',
        phone: '',
        email: '',
    });
    const [orders, setOrders] = useState([]);

    console.log('user data', user);

    // useEffect(() => {
    //     async function fetchUserData() {
    //
    //         // const userData = await fetchUserFromAPI();
    //         // const userOrders = await fetchOrdersFromAPI();
    //
    //         setUser(userData);
    //         setOrders(userOrders);
    //     }
    //
    //     fetchUserData();
    // }, []);

    // todo выгрузка заказов пользователя
    // async function fetchOrdersFromAPI() {
    //     try {
    //         const response = await fetch(`https://localhost:8081/users/find_${user}`);
    //         const data = await response.json();
    //         onHandleProductChange(data);
    //         const allPrices = data.map(val => val.price).sort();
    //         setPrices([allPrices[0], allPrices[allPrices.length - 1]]);
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return [
    //         {id: '123', date: '2023-05-01', status: 'Доставлен', total: '1500'},
    //         {id: '124', date: '2023-05-02', status: 'В обработке', total: '2000'}
    //     ];
    // };

    const handleUpdateUser = async (updatedUser) => {
        // todo update data
        setUser(updatedUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/sign_in';
    };

    return (
        <Container className='mt-3'>
            <UserProfile classname='mt-5' user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout}/>
            <OrderList classname='mt-5' orders={orders}/>
        </Container>
    );
}

export default Profile;
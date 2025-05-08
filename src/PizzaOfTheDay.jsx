import {usePizzaOfTheDay} from './usePizzaOfTheDay';

const intl= new Intl.NumberFormat("en-US" , {
    style: "currency",
    currency: "USD"
})
const PizzaOfTheDay = () => {
    const pizzaOfTheDay= usePizzaOfTheDay();// get the data from usepizzaoftheday.jsx

    if(!pizzaOfTheDay){
        return <div>loading...</div>
    }
//IF pizzaOfTheDay is with data 
    return (
        <div className="pizza-of-the-day">
            <h2>Pizza of the day</h2>
            <div>
                <div className="pizza-of-the-day-info">
                    <h3>{pizzaOfTheDay.name}</h3>
                    <p>{pizzaOfTheDay.description}</p>
                    <p className="pizza-of-the-day-price">
                        From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
                    </p>
                    <img 
                    className="pizza-of-the-day-image"
                    src={pizzaOfTheDay.image} 
                    alt={pizzaOfTheDay.name}
                    />

                </div>
            </div>
        </div>
    );


};

export default PizzaOfTheDay;

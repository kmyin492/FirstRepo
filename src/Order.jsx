import { useEffect , useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US" ,
  {
    style :"currency",
    currency: "USD",
  }
);  

export default function Order() {
  const [pizzaTypes, setPizzaTypes]= useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading , setLoading] = useState(true); 
  // console.log(pizzaSize, pizzaType);
  let price , selectedPizza;
  if(!loading){
    selectedPizza = pizzaTypes.find((pizza)=> pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }
  
  
  async function fetchPizzaType() {
    await new Promise (resolve => setTimeout(resolve , 10000));
    const pizzaRes = await fetch("/api/pizzas");//Check again the api
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }
  // fetchPizzaType();//This render every time with page load

  useEffect(()=> {
    fetchPizzaType();

    // return ()=> clerarTimeout(timeout);
  }, [])//second para[] mean  rerender when every time this thing different

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {/* <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option> */}
            {pizzaTypes.map((pizza)=>(
              <option  key={pizza.id} value={pizza.id}>
                        {pizza.name}
              </option>
            ))}
             
            
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {!loading && selectedPizza && (    
  <div className="order-pizza">
    <Pizza
      name={selectedPizza.name}
      description={selectedPizza.description}
      image={selectedPizza.image}
    />
    <p>{price}</p>
  </div >
  )}
 
      </form>
    </div>
  );
}

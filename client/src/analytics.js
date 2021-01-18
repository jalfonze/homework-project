import React, { useState, useEffect } from "react";
import axios from "axios";

function sortAscending(key) {
    return (a, b) => a[key] - b[key];
}
function sortDescending(key) {
    return (a, b) => b[key] - a[key];
}
function Analytics() {
    // hey there
    const [defaultData, setDefaultData] = useState([]);
    const [data, setData] = useState([]);
    const [dataVal, setDataValue] = useState([]);
    const [dataKey, setDataKeys] = useState([]);
    const [ordered, setOrdered] = useState(false);
    const [modal, setModal] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/main")
            // .then((res) => res.json())
            .then((res) => {
                // console.log(res.data);
                setDefaultData(res.data);
                setData(res.data);
            })
            .catch((err) => err);
    }, []);

    const order = (prop) => {
        const sortedOrder = data.sort(
            ordered ? sortAscending(prop) : sortDescending(prop)
        );

        setData(sortedOrder);
        setOrdered(!ordered);
    };

    const carrierInfo = (info) => {
        const dataVal = Object.values(data[info]);
        const dataKey = Object.keys(data[info]);
        setDataValue(dataVal);
        setDataKeys(dataKey);
        setModal(true);
    };

    const closeModal = () => {
        if (modal) {
            setModal(false);
        }
    };

    const filterBy = (prop) => {
        console.log("click");
        if (prop === "default" || prop === "primary" || prop === "modeled") {
            const filteredResults = defaultData.filter(
                (data) => data.type_of_calculations === prop
            );
            console.log(filteredResults);
            setData(filteredResults);
        } else if (
            prop === "Cereals" ||
            prop === "Container" ||
            prop === "Chemicals"
        ) {
            const filteredResults = defaultData.filter(
                (data) => data.type_of_goods === prop
            );
            console.log(filteredResults);
            setData(filteredResults);
        }
    };

    const handleFrom = (e) => {
        console.log(e.target.value);
        setFrom(e.target.value);
    };
    const handleTo = (e) => {
        setTo(e.target.value);
    };

    const betweenCities = (e) => {
        e.preventDefault();
        console.log("FROM ", from, "TO ", to);
        const locationData = defaultData.filter((data) => {
            return data.start_city === from && data.end_city === to;
        });
        console.log(locationData);
        if (locationData.length === 0) {
            setData("No Value");
        } else {
            console.log(data);
            setData(locationData);
        }
    };

    const resetFilter = () => setData(defaultData);

    console.log(data);
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Here are is the table of the Co2 emissions dated for the
                    past 10 weeks
                </h1>
            </header>
            <section className="filtered">
                <nav className="filter-by-calc">
                    <h1>Filter by type of calculations</h1>
                    <div>
                        <button onClick={() => filterBy("default")}>
                            Default
                        </button>
                        <button onClick={() => filterBy("primary")}>
                            Primary
                        </button>
                        <button onClick={() => filterBy("modeled")}>
                            Modeled
                        </button>
                    </div>
                    <h1>Filter by type of goods</h1>
                    <div>
                        <button onClick={() => filterBy("Cereals")}>
                            Cereals
                        </button>
                        <button onClick={() => filterBy("Chemicals")}>
                            Chemicals
                        </button>
                        <button onClick={() => filterBy("Container")}>
                            Container
                        </button>
                    </div>
                </nav>
                <div className="filter-by-locations">
                    <form>
                        <h2>From:</h2>
                        <input
                            onChange={handleFrom}
                            type="radio"
                            id="one"
                            name="between-city"
                            value="Hamburg"
                        ></input>
                        <label htmlFor="one">Hamburg</label>
                        <input
                            onChange={handleFrom}
                            type="radio"
                            id="two"
                            name="between-city"
                            value="Berlin"
                        ></input>
                        <label htmlFor="two">Berlin</label>
                        <input
                            onChange={handleFrom}
                            type="radio"
                            id="three"
                            name="between-city"
                            value="München"
                        ></input>
                        <label htmlFor="three">München</label>
                        <h2>To:</h2>
                        <input
                            onChange={handleTo}
                            type="radio"
                            id="four"
                            name="between-city"
                            value="Bremen"
                        ></input>
                    </form>
                    <form>
                        <label htmlFor="four">Bremen</label>
                        <input
                            onChange={handleTo}
                            type="radio"
                            id="five"
                            name="between-city"
                            value="Berlin"
                        ></input>
                        <label htmlFor="five">Berlin</label>
                        <input
                            onChange={handleTo}
                            type="radio"
                            id="six"
                            name="between-city"
                            value="München"
                        ></input>
                        <label htmlFor="six">München</label>
                        <input
                            onChange={handleTo}
                            type="radio"
                            id="six"
                            name="between-city"
                            value="Hamburg"
                        ></input>
                        <label htmlFor="six">Hamburg</label>
                        <input
                            type="submit"
                            value="filter"
                            onClick={betweenCities}
                        ></input>
                    </form>
                </div>
            </section>
            <div className="reset-button">
                <button onClick={resetFilter}>Reset Filters</button>
            </div>
            <div className="table-div" onClick={closeModal}>
                <div>
                    <h2 onClick={() => order("carrier_company_id")}>Carrier</h2>
                    {(data.length === 0 && <p>loading</p>) ||
                        (data === "No Value" && <p>No Results</p>) ||
                        (data &&
                            data.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <p onClick={() => carrierInfo(i)}>
                                            {info.id}
                                        </p>
                                    </div>
                                );
                            }))}
                </div>
                <div>
                    <h2 onClick={() => order("total_co2_emitted")}>
                        co2 Emitted
                    </h2>
                    {(data.length === 0 && <p>loading</p>) ||
                        (data === "No Value" && <p>No Results</p>) ||
                        (data &&
                            data.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <p>{info.total_co2_emitted}</p>
                                    </div>
                                );
                            }))}
                </div>
                <div>
                    <h2 onClick={() => order("fuel_consumed")}>
                        Fuel consumed
                    </h2>
                    {(data.length === 0 && <p>loading</p>) ||
                        (data === "No Value" && <p>No Results</p>) ||
                        (data &&
                            data.map((info, i) => {
                                return (
                                    <div key={i}>
                                        {(info.fuel_consumed === null && (
                                            <p>null</p>
                                        )) || <p>{info.fuel_consumed}</p>}
                                    </div>
                                );
                            }))}
                </div>
                <div>
                    <h2 onClick={() => order("travelled_distance")}>
                        Total distance travelled
                    </h2>
                    {(data.length === 0 && <p>loading</p>) ||
                        (data === "No Value" && <p>No Results</p>) ||
                        (data &&
                            data.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <p>{info.travelled_distance}</p>
                                    </div>
                                );
                            }))}
                </div>
                <div>
                    <h2 onClick={() => order("weight")}>Average weight</h2>
                    {(data.length === 0 && <p>loading</p>) ||
                        (data === "No Value" && <p>No Results</p>) ||
                        (data &&
                            data.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <p>{info.weight}</p>
                                    </div>
                                );
                            }))}
                </div>
            </div>
            {modal && (
                <div className="modal-parent">
                    <div className="modal-div">
                        <div>
                            {dataKey.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <p>{info}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            {dataVal.map((info, i) => {
                                return (
                                    <div key={i}>
                                        {(info === null && <p>null</p>) || (
                                            <p>{info}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Analytics;

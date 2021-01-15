import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([]);
    // const [carrier, setCarrier] = useState(undefined);
    // const [runEffect, setEffect] = useState(false);
    // const [column, setColumn] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/main")
            // .then((res) => res.json())
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch((err) => err);
    }, []);

    const columnSet = (col) => {
        order(col);
    };

    const order = (col) => {
        if (col === "a") {
            const aOrder = data.sort((a, b) => {
                return a.carrier_company_id - b.carrier_company_id;
            });
            setData(aOrder);
            console.log(aOrder, "A");
        } else if (col === "b") {
            const bOrder = data.sort((a, b) => {
                return a.total_co2_emitted - b.total_co2_emitted;
            });
            // setData(bOrder);
            console.log(bOrder, "B");
        }
    };

    // console.log(column);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to your new project</h1>
                <div className="table-div">
                    <div>
                        <h2 onClick={() => columnSet("a")}>Carrier</h2>
                        {(data.length === 0 && <p>loading</p>) ||
                            (data &&
                                data.map((info, i) => {
                                    return (
                                        <div key={i}>
                                            <p>{info.carrier_company_id}</p>
                                        </div>
                                    );
                                }))}
                    </div>
                    <div>
                        <h2 onClick={() => columnSet("b")}>co2 Emitted</h2>
                        {(data.length === 0 && <p>loading</p>) ||
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
                        <h2>Fuel consumed</h2>
                        {(data.length === 0 && <p>loading</p>) ||
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
                        <h2>Total distance travelled</h2>
                        {(data.length === 0 && <p>loading</p>) ||
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
                        <h2>Average weight</h2>
                        {(data.length === 0 && <p>loading</p>) ||
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
            </header>
        </div>
    );
}
export default App;

// const order = () => {
//     console.log("click");
//     if (carrier === undefined) {
//         const idOrder = data.sort((a, b) => {
//             return a.carrier_company_id - b.carrier_company_id;
//         });
//         // console.log(idOrder, "order");
//         setData(idOrder);
//         setCarrier(true);
//     } else if (carrier === true) {
//         const idOrder = data.sort((a, b) => {
//             return b.carrier_company_id - a.carrier_company_id;
//         });
//         // console.log(idOrder, "order");
//         setData(idOrder);
//         setCarrier(false);
//     } else if (carrier === false) {
//         if (runEffect === true) {
//             setEffect(false);
//         } else {
//             setEffect(true);
//         }
//         setCarrier(undefined);
//     }
// };

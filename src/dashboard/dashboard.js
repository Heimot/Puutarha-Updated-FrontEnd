import CardTable from '../components/CardTable/card';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import '../dashboard/dashboard.css';
import { normalFetch } from '../components/Fetch/Fetch';

function Dashboard() {
    let [type, setType] = useState(false);
    let [flower, setFlower] = useState("");
    let [store, setStore] = useState("");
    let [item, setItem] = useState(null);

    useEffect(() => {
        async function getData() {
            let res = await normalFetch(`orders/tables?date=${sessionStorage.getItem("date")}&valmis=Ei&kerays=Ryönä&kukka=${flower}&kauppa=${store}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            });
            setItem(res.product)
        }
        getData();

        return () => {
            //
        }
    }, [flower, store])

    if (item === null) {
        return <div>Loading....</div>
    }

    const stopSearch = (s) => {
        if (type) {
            if (s.length <= 0) {
                setFlower("");
                setStore("");
                setType(false);
            }
        }
    }

    const searchFilter = async (s) => {
        setType(true);
        let kukka = "";
        switch (s.searchOption) {
            case "Kauppa":
                setType(true);
                setStore(s.search);
                break;
            case "Kukka":
                setType(true);
                setFlower(s.search);
                break;
            default:
                //  
                break;
        }

    }


    // REMOVE after testing ended
    const post = async () => {
        const response = await fetch("http://localhost:3002/products/post", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwidXNlcklkIjoiNWZlYjQzOTMwYmZlNGMyMzI4NGEzZTdiIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTYxMDM2Nzk0MCwiZXhwIjoxNjEwNDU0MzQwfQ.Yy9KbWXYxFjVT9JRB2A7V5ZkpSNReedCylo0NhzmkCg'
            },
            body: JSON.stringify({
                kukka: "Orvokki amppeli punainen",
                toimi: "100",
                kerays: "",
                keratty: "",
                kerattymaara: "",
                lisatieto: ""
            })
        });
        console.log(response.json());
    }

    return (
        <div className="dashboard">
            {item !== undefined ? <div>
                <SearchBar search={(s) => searchFilter(s)} stop={(s) => stopSearch(s)} />
                <div className="tables">

                    <CardTable items={item} />

                </div>
            </div>
                : <div>No orders</div>}
        </div>
    )
}

export default Dashboard;
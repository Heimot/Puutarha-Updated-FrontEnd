import CardTable from '../components/CardTable/card';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import '../dashboard/dashboard.css';
import { Button } from 'reactstrap';
import { useFetch } from '../components/Fetch/Fetch';

function Dashboard() {
    let [type, setType] = useState(false);

    const res = useFetch("http://localhost:3002/orders/tables", `?date=${sessionStorage.getItem("date")}&valmis=Ei&kerays=Ryönä&kukka=&kauppa=`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwidXNlcklkIjoiNWZlYjQzOTMwYmZlNGMyMzI4NGEzZTdiIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTYxMDU0NjcwMiwiZXhwIjoxNjEwNjMzMTAyfQ.Q37wus1LIH6RgO4U7b-__JrSJTSApK8PcRtHUMVxUtE'
        }
    });

    if (res.response === null) {
        return <div>Loading....</div>
    }

    let item = res.response.product;

    const stopSearch = (s) => {
        if (type) {
            if (s.length <= 0) {

                item = res.response.product;
                setType(false);
            }
        }
    }

    const searchFilter = (s) => {
        setType(true);
        switch (s.searchOption) {
            case "Kauppa":
                setType(true);
                // VOI TEHDÄ SERVUN PUOLELLA MIKÄLI HALUAN
                console.log(item)
                item = item.filter((item) => {
                    return item.kauppa.toLowerCase().includes(s.search.toLowerCase());
                });
                break;
            case "Kukka":
                setType(true);
                // KUKKA FILTERING TEHDÄÄN SERVUN PUOLELLA
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
        <div>
            {item !== undefined ? <div>
                <Button onClick={() => post()}></Button>
                <SearchBar search={(s) => searchFilter(s)} stop={(s) => stopSearch(s)} />
                <div className="test">

                    <CardTable items={item} />

                </div>
            </div>
                : <div>No orders</div>}
        </div>
    )
}

export default Dashboard;
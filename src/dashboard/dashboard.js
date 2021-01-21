import CardTable from '../components/CardTable/card';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import '../dashboard/dashboard.css';
import { normalFetch } from '../components/Fetch/Fetch';
import socket from '../components/Sockets/socket-ioConn';

let flo = "";
let sto = "";

function Dashboard() {
    const [type, setType] = useState(false);
    const [flower, setFlower] = useState("");
    const [store, setStore] = useState("");
    const [item, setItem] = useState([]);
    const [object, setObject] = useState([]);

    useEffect(() => {
        async function getData() {
            let res = await normalFetch(`orders/tables?date=${sessionStorage.getItem("date")}&valmis=Ei&kerays=Ryönä&kukka=${flo}&kauppa=${sto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            });
            setItem(res.product)
        }
        getData();
    }, [flower, store])

    useEffect(() => {
        socket.on('chat', async (data) => {
            if (data.message === true) {
                getTable(data.id);
            };
        });
        socket.on('idUpdate', async (data) => {
            if (data.message === true) {
                getTable(data.id);
            };
        });
    }, [])

    useEffect(() => {
        let update = item.map(obj => object.find(o => o._id === obj._id) || obj);
        setItem(update);
    }, [object])

    const getTable = async (id) => {
        let e = await normalFetch(`orders/get/id/${id}?paikka=&valmis=Ei&kukka=${flo}&kauppa=${sto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        });
        setObject([e]);
    }

    if (item === null) {
        return <div>Loading....</div>
    }

    const stopSearch = (s) => {
        if (type) {
            if (s.length <= 0) {
                setFlower("");
                setStore("");
                flo = "";
                sto = "";
                setType(false);
            }
        }
    }

    const searchFilter = async (s) => {
        setType(true);
        switch (s.searchOption) {
            case "Kauppa":
                setType(true);
                setStore(s.search);
                sto = s.search;
                flo = "";
                break;
            case "Kukka":
                setType(true);
                setFlower(s.search);
                flo = s.search;
                sto = "";
                break;
            default:
                //  
                break;
        }

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
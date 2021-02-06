import CardTable from '../components/CardTable/card';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import '../dashboard/dashboard.css';
import { normalFetch } from '../components/Fetch/Fetch';
import socket from '../components/Sockets/socket-ioConn';

let flo = "";
let sto = "";
let ip = 0;

function Dashboard() {
    const [type, setType] = useState(false);
    const [flower, setFlower] = useState("");
    const [store, setStore] = useState("");
    const [item, setItem] = useState([]);
    const [object, setObject] = useState();
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        async function getData() {
            let res = await normalFetch(`orders/tables?date=${sessionStorage.getItem("date")}&valmis=Ei&kerays=&kukka=${flo}&kauppa=${sto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            });
            setItem(res.product)
        }
        getData();
    }, [flower, store, update])

    useEffect(() => {
        socket.on('chat', async (data) => {
            if (data.message === true) {
                setUpdate(ip)
                ip++;
            };
        });
        socket.on('idUpdate', async (data) => {
            if (data.message === true) {
                getTable(data.id, data.updateOrNew);
            };
        });
    }, [])

    useEffect(() => {
        try {
            let update;
            if (Array.isArray(object)) {
                update = item.map(obj => object.find(o => o._id === obj._id) || obj);
                setItem(update);
            } else {
                if (object.length === undefined) {
                    setItem([...item, object])
                }
            }
            return (() => {
                update = "";
            })
        } catch (err) {
            console.log("err")
        }
    }, [object])

    const getTable = async (id, updateOrNew) => {
        let e = await normalFetch(`orders/get/id/${id}?paikka=&valmis=Ei&kukka=${flo}&kauppa=${sto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        });

        if (updateOrNew) {
            setObject([e]);
        } else {
            setObject(e);
        }

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
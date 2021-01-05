import CardTable from '../components/CardTable/card';
import { useState } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import '../dashboard/dashboard.css';
import { Button } from 'reactstrap';

// tuusjarvi, ryona, _id, products, kauppa, date, alisatieto, toimituspvm, rullakot, hyllyt, orderLisatieto

function Dashboard() {
    let [arr, setArr] = useState([
        {
            _id: Math.random() * 1000,
            products: [{ _id: Math.random() * 1000, kukka: "Orvokki amppeli punainen fsahfhaf afhashfa asfh", toimi: 50, kerays: "Tuusjärvi", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" }, { _id: Math.random() * 1000, kukka: "Orvokki amppeli punainen fsahfhaf afhashfa asfh", toimi: 50, kerays: "Tuusjärvi", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" }],
            kauppa: "Prisma",
            date: new Date('dd/mm/yyyy'),
            alisatieto: "order nro 124353",
            toimituspvm: new Date('dd/mm/yyyy'),
            rullakot: [],
            hyllyt: [],
            orderLisatieto: "Kerätään vikana"
        },
        {
            _id: Math.random() * 1000,
            products: [{ _id: Math.random() * 1000, kukka: "Orvokki", toimi: 50, kerays: "Ryönä", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" },],
            kauppa: "Prisma",
            date: new Date('dd/mm/yyyy'),
            alisatieto: "order nro 124353",
            toimituspvm: new Date('dd/mm/yyyy'),
            rullakot: [],
            hyllyt: [],
            orderLisatieto: "Kerätään vikana"
        },
        {
            _id: Math.random() * 1000,
            products: [{ _id: Math.random() * 1000, kukka: "Orvokki", toimi: 50, kerays: "Ryönä", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" },],
            kauppa: "Prisma",
            date: new Date('dd/mm/yyyy'),
            alisatieto: "order nro 124353",
            toimituspvm: new Date('dd/mm/yyyy'),
            rullakot: [],
            hyllyt: [],
            orderLisatieto: "Kerätään vikana"
        },
        {
            _id: Math.random() * 1000,
            products: [{ _id: Math.random() * 1000, kukka: "Orvokki", toimi: 50, kerays: "Ryönä", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" },],
            kauppa: "Kauppa",
            date: new Date('dd/mm/yyyy'),
            alisatieto: "order nro 124353",
            toimituspvm: new Date('dd/mm/yyyy'),
            rullakot: [],
            hyllyt: [],
            orderLisatieto: "Kerätään vikana"
        },
        {
            _id: Math.random() * 1000,
            products: [{ _id: Math.random() * 1000, kukka: "Amppeli", toimi: 50, kerays: "Ryönä", keratty: "Odottaa keräystä", kerattymaara: 0, lisatieto: "test", valmis: "Ei", tarkastettu: "Ei" },],
            kauppa: "Testi",
            date: new Date('dd/mm/yyyy'),
            alisatieto: "order nro 124353",
            toimituspvm: new Date('dd/mm/yyyy'),
            rullakot: [],
            hyllyt: [],
            orderLisatieto: "Kerätään vikana"
        },
    ]);
    let [saveData, setSaveData] = useState();
    let [type, setType] = useState(false);

    const stopSearch = (s) => {
        if (type) {
            if (s.length <= 0) {
                // TÄHÄN FETCH KAIKKI TIEDOT BACK
                setArr(saveData);
                setType(false);
            }
        }
    }

    const searchFilter = (s) => {
        setType(true);
        setSaveData(arr);
        switch (s.searchOption) {
            case "Kauppa":
                console.log("F")
                setType(true);
                setSaveData(arr);
                // VOI TEHDÄ SERVUN PUOLELLA MIKÄLI HALUAN
                setArr(arr.filter((item) => {
                    return item.kauppa.toLowerCase().includes(s.search.toLowerCase());
                }));
                break;
            case "Kukka":
                setType(true);
                setSaveData(arr);
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
                 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwidXNlcklkIjoiNWZlYjQzOTMwYmZlNGMyMzI4NGEzZTdiIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTYwOTI1NDAwNSwiZXhwIjoxNjA5MzQwNDA1fQ.JSXD-FG44HHNQDRTb8cWV4JygZ3gI7saZNsgyVfbB94'
             },
             body: JSON.stringify({
                 kukka: "Orvokki amppeli punainen",
                 toimi: "100",
              /* kerays: "",
                 keratty: "",
                 kerattymaara: "",
                 lisatieto: "" */
             })
         });
         console.log(response.json());
    }

    return (
        <div>
            <Button onClick={() => post()}></Button>
            <SearchBar search={(s) => searchFilter(s)} stop={(s) => stopSearch(s)} />
            <div className="test">

                <CardTable items={arr} />

            </div>
        </div>
    )
}

export default Dashboard;
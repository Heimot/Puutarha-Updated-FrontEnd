import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import NavData from "../components/NavData/navData";
import "../navigationBar/nav.css";

function Nav() {
    const [Open, setOpen] = useState(false);
    const [Block, setBlock] = useState("nothing");
    const [Close, setClose] = useState("closedNav")

    useEffect(() => {
        if (Open) {
            setBlock("blocked");
            setClose("openNav");
        } else {
            setBlock("nothing");
            setClose("closedNav");
        }
        return () => {
            if(Open) {
                setOpen(false);
            }
        }
    }, [Open])

    return (
        <div className="navBar">
            <Button onClick={() => setOpen(!Open)}>OPEN</Button>
            <div className={Close}>
                <div className="navSide">
                    <NavData />
                </div>
            </div>
            <div className={Block} />
        </div>
    )
}

export default Nav;
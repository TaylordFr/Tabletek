import { useEffect, useState } from "react";
import Navi from "./Navi";


interface Tablet {
    id: number;
    name: string;
    ram: string;
    processor: string;
    storage_space: string;
    price: number;
}


export default function Kezdolap(){
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/tablets")
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else if(response.status === 404) {
                    setErrorServer("404 - Resource not found")
                } else if(!response.ok) {
                    setErrorServer("Server responded with status " + response.status);
                }
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, []);


        if(loading){
            return <p>Loading, please wait....</p>
        }
        if(error){
            return <p>Error: {error}</p>
        }
        if(errorServer){
            return <p>An error occurred with the server</p>
        }; 

        const arrangedTablets = [...tablets].sort((a,b) => a.price - b.price)
        const cheapestthree = arrangedTablets.slice(0, 3);
        const expensivethree = arrangedTablets.slice(-3);

        return (
            <>
            <body>
                <Navi />
                <section className="cheapestthree">
                    <h3>A 3 legolcsóbb tablet:</h3>
                    <ul>
                        {
                            cheapestthree.map((tablet) => (
                                <li key={tablet.id}>
                                     {tablet.name} - {tablet.price}$ |
                                    <a href={`/tablets/${tablet.id}`} style={{marginLeft: "15px"}}>Részletek</a>
                                </li>
                            ))
                        }
                    </ul>
                </section>

                <section className="expensivethree">
                    <h3>A 3 legdrágább tablet:</h3>
                    <ul>
                        {
                            expensivethree.map((tablet) => (
                                <li key={tablet.id}>
                                    {tablet.name} - {tablet.price}$ |
                                    <a href={`/tablets/${tablet.id}`} style={{marginLeft: "15px"}}>Részletek</a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </body>
            </>
        )
    }
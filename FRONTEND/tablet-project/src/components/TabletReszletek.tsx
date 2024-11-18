import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navi from "./Navi";


interface Tablet {
    id: number;
    name: string;
    ram: string;
    processor: string;
    storage_space: string;
    price: number;
}


export default function TabletReszletek(){
    const [tablets, setTablets] = useState<Tablet | null>(null);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");
    const [loading, setLoading] = useState(true);
    const { tabletId } = useParams<{tabletId: string}>();

    useEffect(() => {
        fetch(`http://localhost:3000/tablets/${tabletId}`)
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
    }, [tabletId]);


        if(loading){
            return <p>Loading, please wait....</p>
        }
        if(error){
            return <p>Error: {error}</p>
        }
        if(errorServer){
            return <p>An error occurred with the server</p>
        }; 

    return (
            <>
            <body>
                <Navi />

                <section className="tabletlista">
                    <h3>A választott tablet részletei:</h3>
                    {tablets ? (
                        <div>
                            <h2>{tablets.name}</h2>
                            <p>{tablets.processor}</p>
                            <p>{tablets.ram}</p>
                            <p>{tablets.storage_space}</p>
                            <p>{tablets.price}</p>
                        </div>
                    ) : (
                        <p>Nincs elérhető adat</p>
                    )}
                </section>
            </body>
            </>
        )
    }
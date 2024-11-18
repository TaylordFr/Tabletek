import { useState, useEffect } from "react";
import Navi from "./Navi";


interface Tablet {
    id: number;
    name: string;
    ram: string;
    processor: string;
    storage_space: string;
    price: number;
}

export default function TabletTorles(){
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");
    const [loading, setLoading] = useState(true);


    const handleDelete = async (tabletId: number) => {
        const answer = confirm("Are you sure you want to delete?")
        if(answer) {
            try{
                const response = await fetch(`http://localhost:3000/tablets/${tabletId}`, {
                    method: 'DELETE',
                })
    
                if(!response.ok){
                    const errorData = await response.json();
                    setError(errorData.error);
                    throw new Error(`An error occurred: ${response.status}`);
                }

                setTablets((baseTablets) => baseTablets.filter((tablet) => tablet.id !== tabletId))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message)
            }
        }
    };


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
    
    
    return (
        <>
        <body>
            <Navi />
            <h2>Tabletek törlése: </h2>
            <ul>
            {tablets.map((tablet) => (
                <li key={tablet.id}>
                    {tablet.name} - {tablet.price}
                    <span style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(tablet.id)}>Törlés</span>
                </li>
            ))}
            </ul>

        </body>
        </>
    )

    }

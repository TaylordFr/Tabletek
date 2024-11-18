import { useState, useEffect } from 'react';
import Navi from "./Navi";

interface Tablet {
    id: number;
    name: string;
    ram: string;
    processor: string;
    storage_space: string;
    price: number;
  }

const PhoneList = () => {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTablets = (page: number) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/tablets?page=${page}&limit=5`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTablets(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return 
            <>
                <Navi />
                <div>
                  <h2>Tabletek</h2>
                  <form>
                    <label>
                      Keresés: 
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Név..."
                        
                      />
                    </label>
                    
                  </form>
                    <br />
                  <table className="table table-hover table-bordered">
                    <thead style={{backgroundColor: 'lightgray'}}>
                      <tr>
                        <th>
                          Név
                          <button
                            onClick={() => sortTablets("name", "asc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8593;
                          </button>
                          <button
                            onClick={() => sortTablets("name", "desc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8595;
                          </button>
                        </th>
                        <th>
                          RAM
                          <button
                            onClick={() => sortTablets("ram", "asc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8593;
                          </button>
                          <button
                            onClick={() => sortTablets("ram", "desc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8595;
                          </button>
                        </th>
                        <th>
                          Processzor
                          <button
                            onClick={() => sortTablets("processor", "asc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8593;
                          </button>
                          <button
                            onClick={() => sortTablets("processor", "desc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8595;
                          </button>
                        </th>
                        <th>
                            Tárhely
                        </th>
                        <th>
                            Ár
                            <button
                            onClick={() => sortTablets("price", "asc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8593;
                          </button>
                          <button
                            onClick={() => sortTablets("price", "desc")}
                            style={{
                              textDecoration: "none",
                              border: "none",
                              background: "none",
                            }}
                          >
                            &#8595;
                          </button>
                        </th>
                      </tr>
                    </thead>
        
                    <tbody>
                      {filteredTablets.map((tablet) => (
                        <tr key={tablet.id} style={{ marginLeft: "10px" }}>
                          <td style={{marginRight: "10px", paddingRight: "30px"}}>{tablet.name}</td>
                          <td> {tablet.ram} </td>
                          <td style={{marginRight: "10px", paddingRight: "30px"}}> {tablet.processor} </td>
                          <td> {tablet.storage_space} </td>
                          <td> {tablet.price}$</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Előző
                        </button>
                        <span>
                            Oldal {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Következő
                        </button>
                    </div>
            </>
};

export default PhoneList;

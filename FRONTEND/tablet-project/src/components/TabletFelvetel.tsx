import { useState } from "react";
import Navi from "./Navi";

export default function TabletFelvetel() {
  const [Id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [processor, setProcessor] = useState<string>("");
  const [ram, setRam] = useState<string>("");
  const [storageSpace, setStorageSpace] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newTablet = {
      id: Id,
      name: name,
      processor: processor,
      ram: ram,
      storage_space: storageSpace,
      price: price,
    };
    try {
      const response = await fetch("http://localhost:3000/tablets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTablet),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        throw new Error(`An error occurred: ${response.status}`);
      }

      setSuccess(true);
      setId(undefined);
      setName("");
      setProcessor("");
      setStorageSpace("");
      setPrice(0);
      setRam("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <body>
        <Navi />

        <section className="add_tablets">
          <h2>Add meg a tablet adatait: </h2>
          <form onSubmit={handleSubmit}>
            <label>Tablet név:</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(String(e.target.value))}
              required
            />
            <br />
            <br />
            <label>RAM:</label>
            <br />
            <input
              type="text"
              id="ram"
              name="ram"
              value={ram}
              onChange={(e) => setRam(String(e.target.value))}
              placeholder="e.g., 8GB"
              required
            />
            <br />
            <br />

            <label>Processzor:</label>
            <br />
            <input
              type="text"
              id="processor"
              name="processor"
              value={processor}
              onChange={(e) => setProcessor(String(e.target.value))}
              required
            />
            <br />
            <br />

            <label>Tárhely:</label>
            <br />
            <input
              type="text"
              id="storage_space"
              name="storage_space"
              value={storageSpace}
              onChange={(e) => setStorageSpace(String(e.target.value))}
              placeholder="e.g., 128GB"
              required
            />
            <br />
            <br />

            <label>Ár ($):</label>
            <br />
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <br />
            <br />

            <button type="submit">Felvesz</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && (
              <p style={{ color: "green" }}>Sikeres tablet felvétel!</p>
            )}
          </form>
        </section>
      </body>
    </>
  );
}

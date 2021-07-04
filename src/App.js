import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [età, setEtà] = useState(0);
  const [listaDeiClienti, setListaDeiClienti] = useState([]);

  const aggiungiCliente = () => {
    Axios.post("http://localhost:3001/aggiungiCliente", {
      nome: nome,
      età: età,
    }).then((response) => {
      setListaDeiClienti([
        ...listaDeiClienti,
        { _id: response.data._id, nome: nome, età: età },
      ]);
    });
  };

  const modificaCliente = (id) => {
    const newEtà = prompt("Inserisci nuovamente l'età: ");
    Axios.put("http://localhost:3001/modificaCliente", {
      newEtà: newEtà,
      id: id,
    }).then(() => {
      setListaDeiClienti(
        listaDeiClienti.map((val) => {
          return val._id == id ? { _id: id, nome: val.nome, età: newEtà } : val;
        })
      );
    });
  };

  const rimuoviCliente = (id) => {
    Axios.delete(`http://localhost:3001/rimuoviCliente/${id}`).then(() => {
      setListaDeiClienti(
        listaDeiClienti.filter((val) => {
          return val._id != id;
        })
      );
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setListaDeiClienti(response.data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Inserisci Nome..."
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Inserisci Età..."
          onChange={(event) => {
            setEtà(event.target.value);
          }}
        />

        <button onClick={aggiungiCliente}>Aggiungi Cliente</button>
      </div>
      <div className="listaDeiClienti">
        {listaDeiClienti.map((val) => {
          return (
            <div className="clientiContainer">
              <div className="clienti">
                <h3>Nome: {val.nome}</h3>
                <h3>Età: {val.età}</h3>
              </div>
              <button
                onClick={() => {
                  modificaCliente(val._id);
                }}
              >
                Modifica
              </button>
              <button
                onClick={() => {
                  rimuoviCliente(val._id);
                }}
                id="rimuoviBtn"
              >
                Rimuovi
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;

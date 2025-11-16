import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { Search } from "./components/Search.jsx";
import { Table } from "./components/Table.jsx";
import { CreateUser } from "./components/CreateUser.jsx";

function App() {
  const [users, setUsers] = useState([])
  const [createUser, setCreateUser] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
    .then(response => response.json())
    .then(result => setUsers(Object.values(result)))
    .catch(err => alert(err.message))
  }, [createUser])

  const createUserHandle = () => {
    setCreateUser(state => !state)
  }

  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />

          <Table data={users} />

          <button className="btn-add btn" onClick={createUserHandle}>Add new user</button>
          <Pagination />
        </section>
      </main>
      <Footer />

      {createUser && <CreateUser createUserHandle={createUserHandle}/>}
    </>
  )
}

export default App

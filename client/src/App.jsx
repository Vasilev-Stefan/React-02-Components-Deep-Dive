import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { Search } from "./components/Search.jsx";
import { Table } from "./components/Table.jsx";
import { CreateUser } from "./components/CreateUser.jsx";
import { DetailsUser } from "./components/DetailsUser.jsx";

function App() {
  const [users, setUsers] = useState([])
  const [createUser, setCreateUser] = useState(false)
  const [detailUser, setDetailUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(result => setUsers(Object.values(result)))
      .catch(err => alert(err.message))
  }, [createUser])

  const createUserHandle = () => {
    setCreateUser(state => !state)
  }

  const detailsUserHandle = async (event, id) => {
    if (id) {
      try {
        const response = await fetch(`http://localhost:3030/jsonstore/users/${id}`)
        const result = await response.json()
        setSelectedUser(result)
        console.log(result)
      } catch (err) {
        alert(err.message)
      }
    }
    setDetailUser(state => !state)
  }




  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />

          <Table data={users} onDetails={detailsUserHandle} />

          <button className="btn-add btn" onClick={createUserHandle}>Add new user</button>
          <Pagination />
        </section>
      </main>
      <Footer />

      {createUser && <CreateUser createUserHandle={createUserHandle} />}
      {detailUser && <DetailsUser onClose={detailsUserHandle} {...selectedUser}/>}
    </>
  )
}

export default App

import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { Search } from "./components/Search.jsx";
import { Table } from "./components/Table.jsx";
import { CreateUser } from "./components/CreateUser.jsx";
import { DetailsUser } from "./components/DetailsUser.jsx";
import { DeleteUser } from "./components/DeleteUser.jsx";
import { EditUser } from "./components/EditUser.jsx";



function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [createUser, setCreateUser] = useState(false)
  const [detailUser, setDetailUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [deleteUser, setDeleteUser] = useState(false)
  const [forceReset, setForceRefresh] = useState(false)
  const [editUser, setEditUser] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(result => setUsers(Object.values(result)))
      .catch(err => alert(err.message))
      .finally(() => setIsLoading(false))
  }, [createUser, forceReset])

  const saveEditUser = async (event) => {
    event.preventDefault()
    const id = selectedUser._id
    console.log(id)
    const formdata = new FormData(event.target)
    const {country, city, street, streetNumber, ...data} = Object.fromEntries(formdata)
    data.address = {country, city, street, streetNumber}
    data.updatedAt = new Date().toISOString()
    console.log(data)
    try {
      await fetch(`http://localhost:3030/jsonstore/users/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setSelectedUser({})
      editUserModal()
      setForceRefresh(state => !state)
    } catch (error) {
      alert(error.message)
    }
  }

  const editUserModal = async (event, id) => {
    if(id){
      const response = await fetch(`http://localhost:3030/jsonstore/users/${id}`)
      const result = await response.json()
      setSelectedUser(result)
    }
    setEditUser(state => !state)
  }

  const createUserHandle = () => {
    setCreateUser(state => !state)
  }

  const detailsUserHandle = async (event, id) => {
    if (id) {
      try {
        const response = await fetch(`http://localhost:3030/jsonstore/users/${id}`)
        const result = await response.json()
        setSelectedUser(result)
      } catch (err) {
        alert(err.message)
      }
    }
    setDetailUser(state => !state)
  }

  const onDeleteConfirmed = async () => {
    try {
      await fetch(`http://localhost:3030/jsonstore/users/${selectedUser._id}`, {method: 'delete'})
      setSelectedUser({})
      deleteUserHandle()
      setForceRefresh(state => !state)
    } catch (error) {
      alert(error.message)
    }
  }

  const deleteUserHandle = async (event, id) => {
    if(id) {
      try {
        const response = await fetch(`http://localhost:3030/jsonstore/users/${id}`)
        const result = await response.json()
        setSelectedUser(result)
        console.log(result)
      } catch (error) {
        alert(error.message)
      }
    }
      setDeleteUser(state => !state)
  }

  




  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
            <Table loading={isLoading} data={users} onDetails={detailsUserHandle} onDelete={deleteUserHandle} onEdit={editUserModal} />
          <button className="btn-add btn" onClick={createUserHandle}>Add new user</button>
          <Pagination />
        </section>
      </main>
      <Footer />

      {createUser && <CreateUser createUserHandle={createUserHandle} />}
      {detailUser && <DetailsUser onClose={detailsUserHandle} {...selectedUser}/>}
      {deleteUser && <DeleteUser onClose={deleteUserHandle} onDelete={onDeleteConfirmed}/>}
      {editUser && <EditUser onClose={editUserModal} onSave={saveEditUser} user={selectedUser}/>}
    </>
  )
}

export default App

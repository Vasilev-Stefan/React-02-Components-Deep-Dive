import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { Search } from "./components/Search.jsx";
import { Table } from "./components/Table.jsx";

function App() {

  return (
    <>
      <Header />
      <main class="main">
        <section class="card users-container">
          <Search />

          <Table />

          <button class="btn-add btn">Add new user</button>
          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App

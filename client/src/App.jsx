import { Header } from "./components/Header.jsx";
import { Search } from "./components/Search.jsx";
import { Table } from "./components/Table.jsx";

function App() {

  return (
    <>
      <Header />
      <main class="main">
        <Search />

        <Table />
      </main>
    </>
  )
}

export default App

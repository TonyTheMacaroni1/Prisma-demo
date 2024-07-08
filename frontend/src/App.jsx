import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Table } from 'react-bootstrap'
import './App.css'
import * as CatService from '../services/'

function App() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching cats')
      const cats = await CatService.getList()
      setCats(cats)
    }
    fetchData();
  }, [])

  const deleteCat = async (id) => {
    await CatService.deleteCat(id)
    const cats = await CatService.getList()
    setCats(cats)
  }


  return (
      <>
        <h1>Cat Database</h1>
        <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Breed</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(cat => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td>{cat.age}</td>
                <td>{cat.sexes.name}</td>
                <td>{cat.breeds.name}</td>
                <td>{cat.fur_color}</td>
                <td>
                  <Button href={`/edit/${cat.id}`}>Edit</Button>&nbsp;
                  <Button variant="danger" onClick={() => deleteCat(cat.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button href="/new">Add New Cat</Button>
      </>
  )
}

export default App

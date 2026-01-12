import axios from 'axios';
import { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './RecipyDashboard.css'
import Card from '../card/Card'


const RecipyDashboard = () => {
  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(true)

  const productsPerPage = 16


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(async () => {
    const response = await axios.get(`https://dummyjson.com/recipes?page{page}`);
    setRecipes(prev=>[...prev, ...response.data]);
    setLoading(false)
  }, [page])

  const handleScroll = () =>{
    // console.log(document.documentElement.scrollHeight);
    // console.log(document.documentElement.scrollTop);
    // console.log(window.innerHeight)
    if(window.innerHeight + document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
      setLoading(true)
      setPage(prev=>prev+1)

    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return ()=>window.removeEventListener("scroll",handleScroll)
  }, [])

  // useEffect(() => {
  //   const baseUrl = 'https://dummyjson.com/recipes'
  //   const url = debouncedSearch
  //     ? `${baseUrl}/search?q=${encodeURIComponent(debouncedSearch)}`
  //     : baseUrl

  //   fetch(url)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`)
  //       }
  //       return res.json()
  //     })
  //     .then(data => {
  //       setRecipes(data.recipes || [])
  //       setCurrentPage(1)
  //     })
  //     .catch(err => {
  //       console.error("Fetch error:", err)
  //       setRecipes([])
  //     })
  // }, [debouncedSearch])


  const lastIndex = currentPage * productsPerPage
  const firstIndex = lastIndex - productsPerPage
  const currentRecipes = recipes.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(recipes.length / productsPerPage)

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="card-flex">
        {currentRecipes.length > 0 ? (
          currentRecipes.map(item => (
            <Card
              key={item.id}
              recipe={item}
            />
          ))
        ) : (
          <p>No products found matching "{debouncedSearch}"</p>
        )}
      </div>


      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "10px", padding: "8px" }}
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "8px" }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default RecipyDashboard

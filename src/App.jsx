import { useEffect, useState } from 'react';
import './App.css'
import JobPosting from './components/JobPosting';

const ITEMS_PER_PAGE = 6;

const API_END_POINTS = "https://hacker-news.firebaseio.com/v0";
// const EXAMPLE_RESPONSE = {
//   "by": "voisin",
//   "descendants": 1,
//   "id": 34687321,
//   "kids": [34687595],
//   "score": 3,
//   "time": 1675733565,
//   "title": "Dell Lays Off About 6,650 Employees in Latest Tech Cuts",
//   "type": "story",
//   "url": "https://www.bloomberg.com/news/articles/2023-02-06/dell-dell-lays-off-about-6-650-employees-in-latest-tech-cuts"
// }

function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [curPage, setCurPage] = useState(0);


  const fetchItem = async (curPage) => {
    setCurPage(curPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_END_POINTS}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList)
    }
    console.log(itemsList)
    const itemIdsForPage = itemsList.slice(
      curPage*ITEMS_PER_PAGE, curPage*ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    const itemsForPage = await Promise.all(itemIdsForPage.map((itemId) => fetch(`${API_END_POINTS}/item/${itemId}.json`).then(res => res.json())));
    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false)

  }
  useEffect(() => {

    if (curPage === 0) fetchItem(curPage);
  }, [])


  return (
    <div>
      <h1>Job Boards</h1>
      <div className='app'>
        <h1 className='title'>Hacker News Job Boards </h1>
        {
         ( itemIds== null || items.length < 1) ? <div className='loading'>Loading...</div> : <div>

            <div role='list' className='items'>
              {
                items.map((item, index) => <JobPosting {...item} key={item.id} />)
              }
            </div>
            <button disabled={fetchingDetails} className='btn__load' onClick={()=> fetchItem(curPage+1)}> {fetchingDetails ? "Loading..." : "Load More Jobs" } </button>
          </div>
        }


      </div>
    </div>
  )
}

export default App

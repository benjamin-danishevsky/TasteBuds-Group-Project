import SearchBar from '../SearchBar'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <>
    <div className='error-div'>
      <h1>404 The page you are looking for has been ate up... 🍜</h1>
      <h2>Let's try searching for another tasty event</h2>
      <SearchBar />
    </div>
    </>
  )
}

export default ErrorPage

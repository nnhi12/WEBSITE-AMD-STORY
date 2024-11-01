import { useState, useEffect } from 'react'
import axios from 'axios';
import HomePage from './pages/User/HomePage/HomePage'
import StoryInfo from './pages/User/StoryInformation/StoryInforPage'
import ChapterView from './pages/User/ViewChapter/viewchapter'
import ListReading from './pages/User/Library/Library'
import LogIn from './pages/Main/Login/Login'
import SignUp from './pages/User/Register/Register'
import ClassifiedByGenre from './pages/User/ClassifiedByGenre/ClassifiedByGenre'
import ClassifiedByChapter from './pages/User/ClassifiedByChapter/ClassifiedByChapter'
import TopHot from './pages/User/TopHotStory/TopHotStory'
import FavouriteStory from './pages/User/FavouriteStory/FavouriteStory'
import AboutUs from './pages/User/AboutUs/AboutUsPage'
import SearchPage from './pages/User/SearchResult/SearchResult'
import UserInfo from './pages/User/UserInformation/UserInformationPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
  const [account, setAccounts] = useState(null);
  

  useEffect(()=> {
     fetchAccounts();
  }, [])
  const fetchAccounts = async () => {
      const res = await axios.get("http://localhost:3001/");
      setAccounts(res.data.account);
  }

  const createAccount = (e) => {
    e.preventDefault();
  }
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path = '/register' element = {<SignUp />}> </Route>
            <Route path = '/login' element = {<LogIn />}> </Route>
            <Route path = '/' element = {<HomePage />}> </Route>
            <Route path = '/storyinfo' element = {<StoryInfo />}> </Route>
            <Route path = '/viewchapter' element = {<ChapterView />}> </Route>
            <Route path = '/library' element = {<ListReading />}> </Route>
            <Route path = '/classifiedbygenre' element = {<ClassifiedByGenre />}> </Route>
            <Route path = '/classifiedbychapter' element = {<ClassifiedByChapter />}> </Route>
            <Route path = '/tophot' element = {<TopHot />}> </Route>
            <Route path = '/favpage' element = {<FavouriteStory />}> </Route>
            <Route path = '/aboutus' element = {<AboutUs />}> </Route>
            <Route path = '/searchresult' element = {<SearchPage />}> </Route>
            <Route path = '/userinfo' element = {<UserInfo />}> </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

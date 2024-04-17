import { useState } from 'react'
import axios from 'axios'
import './css/App.css'
import Login from "./Login"
// import Rewards from "./Rewards"
import Home from "./Home";
import {getCsrfToken} from "./utils.jsx";

axios.defaults.baseURL = 'http://localhost:3500';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
  const [courses, setCourses] = useState(null);
  const [userData, setUserData] = useState(null); //from db
  const [overlay, setOverlay] = useState("login")

  const [changedCats, setChangedCats] = useState([])
  const [changeType, setChangeType] = useState("")

  function onLoginDataReceived(newCourses, newUserData, bossResults) {
    setCourses(newCourses)
    setUserData(newUserData)
    let newSubmissionsExist = false
    for (let course of newCourses) {
      if (course[3].length > 0) {
        newSubmissionsExist = true
        break
      }
    }

    for (const result of bossResults) {
      if (result.result && result.result === "win") {
        setChangeType("won")
        setChangedCats([result.newCat])
      } else if (result.result && result.result === "lose") {
        setChangeType("lost")
        setChangedCats(result.lostCats)
      }
    }

    if (newSubmissionsExist) {
      setOverlay("rewards")
    } else {
      setOverlay("home")
    }
  }

//due_at, points_possible, has_submitted_submissions, name, 

/*
COURSE STORAGE - NEW MODEL
  [
    course id
    course name
    course assignments:
    [
      assignment id
      assignment name
      due date
      points possible
    ]
    new submissions:
    [
      assignment id
      assignment name
      unlock date
      due date
      points possible
      submission id
      submission date
      submission points
    ]
    new submissions since last weekend:
    [(same as above)]
  ]
*/

  switch (overlay) {
    case "login":
      return <Login onLoginDataReceived={onLoginDataReceived}/>
    default:
      return <Home userData={userData} setUserData={setUserData} courses={courses} setCourses={setCourses} overlay={overlay} setOverlay={setOverlay} changedCats={changedCats} setChangedCats={setChangedCats} changeType={changeType} setChangeType={setChangeType} getCsrfToken={getCsrfToken} />
  }
}

export default App

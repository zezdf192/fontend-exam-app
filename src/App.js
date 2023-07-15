import { useEffect } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'


//admin
import ManageUser from './pages/Admin/ManageUser'
import { path } from './until/constant'
import ManageExam from './pages/Admin/ManageExam'

//user
import CreateExam from './pages/User/CreateExam'
import EditExam from './pages/User/EditExam/EditExam'
import Verification from './component/Verification/Verification'
import StartExam from './pages/Exam/StartExam'
import ResultExam from './pages/Exam/ResultExam/ResultExam'
import MyExam from './pages/User/MyExam/MyExam'
import MyDoExam from './pages/User/MyExam/MyDoExam/MyDoExam'
import RatingsExam from './pages/User/Ratings/RatingsExam/RatingsExam'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import DetailUser from './pages/User/DetailUser/Setting'
import NotFound from './pages/NotFound/NotFound'
import MyLoveExam from './pages/User/MyLoveExam/MyLoveExam'
import ForgotPassword from './pages/User/ForgotPassword/ForgotPassword'

const config = {
    apiKey: 'AIzaSyCH9GOIU2oMBdWwXlTNQ7W1FKmR1Lns-Ic',
    authDomain: 'examapp-4b481.firebaseapp.com',
    
}
firebase.initializeApp(config)

function App() {
   
    //handle firebase auth change
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            //setIsSignedIn(!!user);
            if (!user) {
                //user log out, hanlde something here
                return
            }

            const token = await user.getIdToken()
        })
        return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [])

    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        <Route exact path={path.setting} element={<DetailUser />}></Route>
                        {/* user  */}

                        <Route exact path={path.home} element={<HomePage />}></Route>
                        <Route exact path={path.login} element={<Login />}></Route>
                        <Route exact path={path.signUp} element={<SignUp />}></Route>
                        
                        {/* admin */}
                        <Route exact path={path.manageUser} element={<ManageUser />}></Route>
                        <Route exact path={path.manageExam} element={<ManageExam />}></Route>

                        {/* exam */}
                        <Route exact path={path.createExam} element={<CreateExam />}></Route>
                        <Route exact path={path.editExam} element={<EditExam />}></Route>

                        <Route exact path={path.verification} element={<Verification />}></Route>
                        <Route exact path={path.startExam} element={<StartExam />}></Route>
                        <Route exact path={path.resultExam} element={<ResultExam />}></Route>
                        <Route exact path={path.myExam} element={<MyExam />}></Route>
                        <Route exact path={path.myLoveExam} element={<MyLoveExam />}></Route>
                        <Route exact path={path.myDoExam} element={<MyDoExam />}></Route>

                        {/* ratings */}
                        <Route exact path={path.ratings} element={<RatingsExam />}></Route>

                        {/* not found */}
                        <Route path={path.forgotPassword} element={<ForgotPassword />} />

                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </Router>
        </div>
    )
}

export default App

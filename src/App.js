import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Suspense,lazy } from 'react';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {HomePage,Profile,ReadingAdd,RecordList,Graphs,NavBar,Signup,Login,
   LandingPage,ProfileEdit,ForgotPassword,MedicineEdit,CareEdit,AppointMentEdit,
    PrivateRoute,LogRoute,RoutineComp,RandomComp} from './components';
const Footer = lazy(() => import('./components/Footer/Footer'));


function App() {
  return (
  <BrowserRouter>
    <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/login" element={<LogRoute><Login/></LogRoute>} />
            <Route path="/signup" element={<LogRoute><Signup/></LogRoute>} />
            <Route path="/forgot-password" element={<LogRoute><ForgotPassword/></LogRoute>} />
            <Route path="/welcome" element={<PrivateRoute><NavBar/><HomePage/></PrivateRoute>}></Route>
            <Route path="/routine_record/:id" element={<PrivateRoute><NavBar/><RoutineComp/></PrivateRoute>}></Route>
            <Route path="/routine_record" element={<PrivateRoute><NavBar/> <RoutineComp/></PrivateRoute>}></Route>
            <Route path="/random_record/:id" element={<PrivateRoute><NavBar/><RandomComp/></PrivateRoute>}></Route>
            <Route path="/random_record/" element={<PrivateRoute><NavBar/><RandomComp/></PrivateRoute>}></Route>
            <Route path="/profile/" element={<PrivateRoute><NavBar/><Profile/></PrivateRoute>}></Route>
            <Route path="/addreadings/" element={<PrivateRoute><NavBar/><ReadingAdd/></PrivateRoute>}></Route>
            <Route path="/listrecords/" element={<PrivateRoute><NavBar/><RecordList/></PrivateRoute>}></Route>
            <Route path="/graphs/" element={<PrivateRoute><NavBar/><Graphs/></PrivateRoute>}></Route>
            <Route path="/profileedit/" element={<PrivateRoute><NavBar/><ProfileEdit/></PrivateRoute>}></Route>
            <Route path="/profileedit/medicineedit" element={<PrivateRoute><NavBar/><MedicineEdit/></PrivateRoute>}></Route>
            <Route path="/profileedit/carepoints" element={<PrivateRoute><NavBar/><CareEdit/></PrivateRoute>}></Route>
            <Route path="/profileedit/appointment" element={<PrivateRoute><NavBar/><AppointMentEdit/></PrivateRoute>}></Route>
          </Routes>
          <Suspense fallback={<div>Loading...</div>}>
            <Footer/>
          </Suspense>
        </AuthProvider>
      </div> 
    </BrowserRouter>
  );
}

export default App;

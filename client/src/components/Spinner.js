import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";

const Spinner = () => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue)
        },1000);
        count === 0 && navigate('/login')
        return ()=> clearInterval(interval)
    },[count, navigate])
  return (
    <>
    
    <div className="d-flex flex-column justify-content-center align-items-center bg-success" style={{height:'100vh'}}>
    <h1 className="text-center text-dark">redirecting to you in {count} second</h1>
  <div className="spinner-grow text-dark" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Spinner
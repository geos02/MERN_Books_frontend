import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {

      const authenticate = async () => {

          const token = localStorage.getItem('token');

          if(!token) {
            navigate('/');
            return;
          }

          try {
            
            const response = await fetch('http://localhost:3000/api/1.0/books', {
              headers : {
                "Authorization" : `Bearer ${token}` 
              }
            });
            const data = await response.json();
            console.log(data);
          } catch(error) {
            console.log(error);
          }

      }

      authenticate();

  },[]);

  return (
    <div>Admin : </div>
  )
}

export default Admin
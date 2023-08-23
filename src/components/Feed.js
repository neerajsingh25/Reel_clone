import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { database } from '../firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
  const { user } = useContext(AuthContext);


  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    })
    return () => {
      unsub();
    }
  }, [user])

  return (
    <>
      {userData != null ? <Navbar userData={userData} /> : null}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        
        {userData != null ? <UploadFile user={userData} /> : null} 
      
       { userData!=null? <Posts userData={userData} /> : null}

      </div>
    </>
  )
}

export default Feed;
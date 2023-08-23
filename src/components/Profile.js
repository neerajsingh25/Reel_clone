import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import './Profile.css';

import CircularProgress from '@mui/material/CircularProgress';


function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        database.users.doc(id).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        })
    }, [id])

    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = [];
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data);
            })
            setPosts(parr);
        })
        return () => {
            unsub();
        }
    }, [])
    console.log(`profile ${posts}`)
    return (
        <>
            {userData == null ? null :
                <>
                    <Navbar userData={userData} />
                    <div className='space'></div>
                    <div className='profile-container'>
                        <div className='upper-part'>
                            <div className='profile-img'>
                                <img src={userData.profileUrl} />
                            </div>
                            <div className='p-info'>
                                <Typography variant='h5'>
                                    Name : {userData.name}
                                </Typography>
                                <Typography variant='h6'>
                                    Posts : {userData.postIds.length}
                                </Typography>
                            </div>
                        </div>
                        <hr style={{ marginTop: '2rem', marginBottom: '2rem' }}></hr>
                        <div className='profile-videos'>
                            {
                                    posts == null ? <CircularProgress /> :
                                    <>
                                    {
                                        posts.map((post, index) => (
                                            <React.Fragment key={index}>
                                                <div className='p-video'>
                                                    <video controls>
                                                        <source src={post.pUrl} />
                                                    </video>

                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                            }
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default Profile
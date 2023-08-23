import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import AddComment from './AddComment';
import ShowComments from './ShowComments';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Posts(props) {
    const [posts, setPosts] = useState();

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

    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const callback = (entries) => {
        entries.forEach((entry) => {
            let elem = entry.target.childNodes[0];
            console.log(elem);
            elem.play().then(() => {
                if (!elem.paused && !entry.isIntersecting) {
                    elem.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, { threshold: 0.6 });
    useEffect(() => {
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element) => {
            observer.observe(element)
        })
        return () => {
            observer.disconnect();
        }
    }, [posts])

    return (
        <div>
            {
                posts == null || props.userData == null ? <CircularProgress /> :
                    <div className='video-container'>
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className='videos'>
                                        <Video src={post.pUrl} />
                                        <div className='avatar' style={{ display: 'flex' }}>
                                            <Avatar src={props.userData.profileUrl} />
                                            <h4>{props.userData.name}</h4>
                                        </div>
                                        <div className='like-icon' style={{ display: 'flex' }}>
                                            <Like userData={props.userData} postData={post} />
                                            <h4>{post.likes.length}</h4>
                                        </div>
                                        <CommentIcon onClick={() => handleClickOpen(post.pId)} className='comment-icon' />
                                        <Dialog
                                            open={open == post.pId}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-describedby="alert-dialog-slide-description"
                                            fullWidth={true}
                                            maxWidth={'xs'}
                                        >

                                            <div className='comment-section'>
                                                <Card className='card1'>
                                                    <ShowComments postData={post} />
                                                </Card>
                                                <Card variant='outlined' className='card2'>
                                                    <AddComment userData={props.userData} postData={post} />
                                                </Card>
                                            </div>
                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts
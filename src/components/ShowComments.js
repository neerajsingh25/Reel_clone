import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import Avatar from '@mui/material/Avatar';

function ShowComments(props) {
    const [comments, setComment] = useState();
    useEffect(() => {
        const fetch = async () => {
            let arr = []
            for (let i = 0; i < props.postData.comments.length; i++) {
                let data = await database.comments.doc(props.postData.comments[i]).get()
                arr.push(data.data())
            }
            setComment(arr);
        }
        fetch()
    }, [props.postData])

    return (
        <div>
            {
                comments == null ? <h2>No Comments</h2> :
                    <>
                        {
                            comments.map((comment, index)=>(
                                <div style={{display:'flex' }}>
                                    <Avatar src={comment.uProfileUrl}/>
                                    <p>&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp;&nbsp;&nbsp; {comment.text}</p>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default ShowComments
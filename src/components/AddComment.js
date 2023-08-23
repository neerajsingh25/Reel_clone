import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { database } from '../firebase';

function AddComment(props) {
    const [text, setText] = useState();
    const handleClick = () => {
        let obj = {
            text: text,
            uProfileUrl: props.userData.profileUrl,
            uName: props.userData.name
        }

        database.comments.add(obj).then(async(ref) => {
            let res = await database.posts.doc(props.postData.postId).update({
                comments: props.postData.comments != null ? [...props.postData.comments, ref.id] : [ref.id]
            })
            setText('')
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'centre', width: '100%' }}>
            <TextField id="filled-basic" label="Comment" fullWidth variant="filled" value={text} onChange={(e) => setText(e.target.value)} />
            <SendIcon onClick={handleClick} />
        </div>
    )
}

export default AddComment;
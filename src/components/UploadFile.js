import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { storage ,database } from '../firebase';


function UploadFile(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState();
    const [progress, setProgress] = useState(0);

    const handleClick = async (file) => {
        if (file == null) {
            setError("please enter details!");
            setTimeout(() => {
                setError('')
            }, 3000)
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError("Video is too Large!");
            setTimeout(() => {
                setError('')
            }, 3000)
            return;
        }

        setLoading(true);
        let uid= uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            console.log(`upload is ${progress} done`);
        }
        function fn2(error) {
            setError(error.message);
            setTimeout(() => {
                setError('')
            }, 3000)
            setLoading(false);
            return;
        }
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
                let obj={
                    likes:[],
                    comments:[],
                    pId:uid,
                    pUrl:url,
                    uName:props.user.name,
                    uProfile:props.user.profileUrl,
                    userId:props.user.userId,
                    createdAt:database.getTimeStamp
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res= await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds!=null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch((error)=>{
                    setError(error.message);
                    setTimeout(() => {
                        setError('')
                    }, 3000)
                    setLoading(false);
                })
            })
        }
    }
    return (
        <div style={{display: 'flex', justifyContent:'center', marginTop:'8vh'}}>
            {
                error ? <Alert severity="error">{error}</Alert> :
                    <div>
                        <Button component="label" disabled={loading} startIcon={<VideoFileIcon />} fullWidth={true} sx={{ marginTop: '2vh' ,marginBottom:'1vh'}} variant="outlined">
                            Upload your video
                            <input type='file' accept='video/*' hidden onChange={(e) => handleClick(e.target.files[0])} />
                        </Button>
                        {loading && <LinearProgress variant="determinate" value={progress}/>}
                    </div>
            }

        </div>
    )
}

export default UploadFile
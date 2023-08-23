import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { database, storage } from '../firebase';

export default function ImgMediaCard() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const handleClick = async () => {
        if (name == null || email == null || password == null) {
            setError("please enter details!");
            setTimeout(() => {
                setError('')
            }, 3000)
            return;
        }
        if (file == null) {
            setError("please upload a picture!");
            setTimeout(() => {
                setError('')
            }, 3000)
            return;
        }

        try {
            setError('');
            setLoading(true);
            const userobj = await signup(email, password);
            const uid = userobj.user.uid;

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        name:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp
                    })
                })
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('')
            }, 3000)
            setLoading(false);
        }
    }
    return (
        <div className='card'>
            <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardContent>
                    <div className='title'>
                        <Typography className='title' gutterBottom variant="h5" component="div">
                            REEL CLONE
                        </Typography>
                        <Typography variant="body" color="black">
                            Sign UP
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}

                    </div>
                    <div >
                        <TextField id="outlined-basic" margin='dense' label="Full Name" variant="outlined" fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" margin='dense' label="Email" variant="outlined" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" margin='dense' label="Set Password" variant="outlined" fullWidth={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button component="label" startIcon={<CloudUploadIcon />} fullWidth={true} sx={{ marginTop: '2vh' }} variant="outlined">
                        Upload your profile pic
                        <input type='file' accept='image/*' hidden onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                </CardContent>
                <CardActions>
                    <Button fullWidth={true} variant="contained" size="small" disabled={loading} onClick={handleClick}>Register</Button>
                </CardActions>
                <div className='last'>
                    <Typography variant="subtitle2" component="h2">
                        Having an account ? <Link to="/login">Login</Link>
                    </Typography>
                </div>
            </Card>
        </div>
    );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import  Alert  from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link ,useNavigate} from 'react-router-dom';
import { useState ,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ImgMediaCard() {
    const[email, setEmail]= useState();
    const[password, setPassword]= useState();
    const[error, setError]= useState('')
    const{login} =useContext(AuthContext);
    const navigate= useNavigate();

    const handleClick= async()=>{
        if(email==null || password==null){
            setError("Please Enter details");
            setTimeout(()=>{
                setError('')
            },3000)
            return;
        }
        
        try {
            setError('');
            const userlog= await login(email, password);
            navigate('/');

        } catch (error) {
            setError(error.message);
            setTimeout(()=>{
                setError('')
            },3000)
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
                            Login
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                    </div>
                    <div >
                        <TextField id="outlined-basic" margin='dense' label="Email" variant="outlined" fullWidth={true} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" margin='dense' label="Set Password" variant="outlined" fullWidth={true} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                </CardContent>
                <CardActions>
                    <Button fullWidth={true} variant="contained" size="small" onClick={handleClick}>Enter</Button>
                </CardActions>
                <div className='last'>
                    <Typography variant="subtitle2" component="h2">
                        Don't have an account ? <Link to="/signup">Signup</Link>
                    </Typography>
                </div>
            </Card>
        </div>
    );
}
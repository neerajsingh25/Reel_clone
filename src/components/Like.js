import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Posts.css'
import { database } from '../firebase';

function Like(props) {
    const [like, setLike] = useState(null);
    useEffect(() => {
        let check = props.postData.likes.includes(props.userData.userId) ? true : false
        setLike(check);
    }, [props.postData])

    const handleLike=()=>{
        if(like==true){
            let narr= props.postData.likes.filter((el)=> el!=props.userData.userId)
            database.posts.doc(props.postData.postId).update({
                likes:narr
            })
        }else{
            let narr= [...props.postData.likes, props.userData.userId]
            database.posts.doc(props.postData.postId).update({
                likes:narr
            })    
        }
    }
    return (
        <div>
            {
                like != null ?
                    <>
                        {
                            like == true ? <FavoriteBorderIcon className={`icon-like like`} onClick={handleLike}/> : <FavoriteBorderIcon className={`icon-like unlike`} onClick={handleLike}/>
                        }
                    </> :
                    <></>
        }
        </div>
    )
}

export default Like
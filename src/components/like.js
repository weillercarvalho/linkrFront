import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteLike, postLike } from "../services/Services"

let liked = false
export default function Liker({isLiked, totalLikes, postId, setLike, renderizaLista}){
    liked = isLiked
    
    function verifyLikes(id, bool){
        const auth = localStorage.getItem('token');
        if(!auth){
            return alert("create an account or log into one to like!");
            //navigate pra principal ou não?
        }if(!bool){
            
            const promisse = postLike(id);
            promisse.then((r) => {
                return renderizaLista();
            });
            promisse.catch((r) => {console.log(r);});
            
            
        }else {
            const promisse = deleteLike(id);
            promisse.then((r) => {
                return renderizaLista();
            });
            promisse.catch((r) => {console.log(r);});
        };
    }

    return(
        <>
        <Like>
        { isLiked ? <ion-icon onClick={()=>{setLike(false)}} name="heart-sharp"></ion-icon>
        : <ion-icon onClick={()=>{setLike(true)}} name="heart-outline"></ion-icon> }
        <p>{`${totalLikes} likes`}</p>
        </Like>
        </>
    )
}

const Like = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    ion-icon{
        font-size: 29px;
        color: ${props => liked ? "#AC0000" : "#ffffff"};
        cursor: pointer;
    };

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 0.5vh;
    }
`
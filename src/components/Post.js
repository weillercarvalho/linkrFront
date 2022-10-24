import styled from "styled-components";
import { postLike, deleteLike } from "../services/Services"

let liked = false;
export default function Post({
    profilePicture, 
    link, 
    profileName, 
    message, 
    isLiked, 
    totalLikes, 
    postId, 
    att //att é a função q renderiza a lista de publicações
    }){

    liked = isLiked;

    function liker(id){
        postLike(id)
            .catch((r) => {
                console.log(r);
            })
            .then((r) => {
            return att();
            });
    };

    function disliker(id){
        deleteLike(id)
            .catch((r) => {
                console.log(r);
            })
            .then((r) => {
            return att();
            });
    }
    

    return(
        <>
            <Posts>
                <PictureLikes>
                    <img src={profilePicture} alt=""/>

                    {isLiked ? <ion-icon onClick={()=>disliker(postId)} name="heart-sharp"></ion-icon> :
                    <ion-icon onClick={()=>liker(postId)} name="heart-outline"></ion-icon>}

                    <p>{totalLikes} likes</p>
                </PictureLikes>
                <Content>
                    <h3>{profileName}</h3>
                    <p>{message}</p>
                    <a href={link} target={"_blank"}>{link}</a>
                </Content>
            </Posts>
        </>
    );
};

const Posts = styled.div`
    width: 40vw;
    height: auto;
    min-width: 500px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 2vh;
    display: flex;
    padding: 2vh 1vw;;
`
const PictureLikes = styled.div`
    width: 50px;
    height: auto;
    margin-right: 1vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 20px;
    }
    ion-icon{
        font-size: 29px;
        color: ${props => liked ? "#AC0000" : "#ffffff"};
        cursor: pointer;
        margin-top: 2vh;
    };

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 0.25vh;
    }
`

const Content = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    };

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin: 1vh 0;
    }
    a{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
`
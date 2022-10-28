import { useEffect, useRef, useState } from 'react';
import { updateUserPost, getHashId } from '../services/Services';
import { EditForms, EditInput } from '../styles/Common';
import { useNavigate } from 'react-router-dom';
import { ReactTagify } from 'react-tagify';

export default function RenderMessage({
  message,
  att,
  setAtt,
  postId,
  shouldEdit,
  setShouldEdit,
}) {
  const [edit, setEdit] = useState(message);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newMessage, setNewMessage] = useState({});
  const inputRef = useRef();
  const navigate = useNavigate();

  const tagStyle ={
    fontWeigth: 700,
    cursor:'pointer',
    fontSize: '20px'
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldEdit]);

  useEffect(() => {
    if (submitted) {
      updateUserPost(newMessage)
        .catch((e) => {
          window.alert('Edit failed, try refreshing your page');
          setSubmitted(!submitted);
          setDisabled(!disabled);
        })
        .then((e) => {
          setSubmitted(!submitted);
          setDisabled(!disabled);
          setShouldEdit(!shouldEdit);
          setAtt(!att);
        });
    }
  }, [submitted]);

  async function goToHashtagPage(str){
    try{
      const hash = await getHashId(str);
      console.log(hash.data);
      if(hash.data.length < 1){
        return;
      }
      navigate(`/hashtag/${hash.data[0].id}`)
      window.location.reload();
      //setAtt(!att);
    }catch(err){
      console.log(err.message);
      alert("problema")
    }
  }

  return shouldEdit ? (
    <EditForms
      onKeyUp={(e) => {
        if (e.code === 'Escape') {
          setEdit(message);
          setShouldEdit(!shouldEdit);
        }
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (edit !== message) {
          setDisabled(!disabled);
          setNewMessage({
            message: edit,
            postId: postId,
          });
          setSubmitted(!submitted);
        } else {
          setShouldEdit(!shouldEdit);
        }
      }}
    >
      <EditInput
        ref={inputRef}
        type={'input'}
        disabled={disabled}
        onChange={(e) => {
          setEdit(e.target.value);
        }}
        defaultValue={edit}
      ></EditInput>
    </EditForms>
  ) : (
    <ReactTagify
    tagStyle={tagStyle}
    tagClicked={(tag)=>goToHashtagPage(tag)}>
      <span>{message}</span>
    </ReactTagify>
  );
}

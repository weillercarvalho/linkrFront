import { useEffect, useRef, useState } from 'react';
import { updateUserPost } from '../services/Services';
import { EditForms, EditInput } from '../styles/Common';

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
    <span>{message}</span>
  );
}

import { Oval } from 'react-loader-spinner';
import {
  AnimationContainer,
  CancelButtom,
  DeleteButtom,
  ModalContent,
  ModalTitle,
  OptionsContainer,
} from '../styles/Common';
import Modal from 'react-modal';
import { deleteUserPost } from '../services/Services';

export default function RenderModal({
  att,
  setAtt,
  modalIsOpen,
  setModalIsOpen,
  loadDelete,
  setLoadDelete,
  mobile,
}) {
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={ModalStyle}
      contentLabel="Delete Modal"
      ariaHideApp={false}
    >
      {loadDelete ? (
        <AnimationContainer>
          <div>
            <Oval
              height={80}
              width={80}
              color="#ffffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#ffffff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
          <div>Deleting</div>
        </AnimationContainer>
      ) : (
        <ModalContent mobile={mobile}>
          <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
          <OptionsContainer>
            <CancelButtom
              onClick={(event) => {
                event.preventDefault();
                setModalIsOpen(false);
              }}
            >
              No, go back
            </CancelButtom>
            <DeleteButtom
              onClick={(event) => {
                event.preventDefault();
                setLoadDelete(true);
                deleteUserPost(modalIsOpen)
                  .catch((r) => {
                    console.log(r);
                    window.alert(
                      "There's been an error while deleting your post"
                    );
                    setModalIsOpen(false);
                  })
                  .then((r) => {
                    setLoadDelete(false);
                    setModalIsOpen(false);
                    setAtt(!att);
                  });
              }}
            >
              Yes, delete it
            </DeleteButtom>
          </OptionsContainer>
        </ModalContent>
      )}
    </Modal>
  );
}

const ModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '18px',
    backgroundColor: '#333333',
  },
  overlay: { zIndex: 314159 },
};

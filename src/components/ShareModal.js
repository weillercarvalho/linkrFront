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
import { handleShare } from './Share';

export default function RenderShareModal({
  att,
  setAtt,
  modalIsOpen,
  setShareModalIsOpen,
  loadShare,
  mobile,
  shareParameters,
}) {
  function closeModal() {
    setShareModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={ModalStyle}
      contentLabel="Delete Modal"
      ariaHideApp={false}
    >
      {loadShare ? (
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
          <ModalTitle>Do you want to re-post this link?</ModalTitle>
          <OptionsContainer>
            <CancelButtom
              onClick={(event) => {
                event.preventDefault();
                setShareModalIsOpen(false);
              }}
            >
              No, cancel
            </CancelButtom>
            <DeleteButtom
              onClick={(event) => {
                event.preventDefault();
                setAtt(
                  handleShare(
                    shareParameters[0],
                    shareParameters[1],
                    shareParameters[2],
                    shareParameters[3]
                  )
                );
                setShareModalIsOpen(false);
                setAtt(!att);
              }}
            >
              Yes, share!
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

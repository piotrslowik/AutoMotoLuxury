import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Modal = ({
  open,
  header,
  onClose,
  children,
  maxWidth,
}) => {
  const [_open, setOpen] = useState(open);

  useEffect(() => window.addEventListener('keyup', closeModalWithEscKey));

  useEffect(() => {
    return () => window.removeEventListener('keyup', closeModalWithEscKey);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
    setOpen(open);
  }, [open]);

  const closeModal = () => {
    const modalRoot = document.querySelector('.Modal');
    modalRoot.classList.add('closing-modal');
    setTimeout(onClose, 300);
  }

  const closeModalWithEscKey = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      window.removeEventListener('keyup', closeModalWithEscKey);
    }
  }
  
  return (
    <React.Fragment>
    { _open
    ? <div className="Modal" onKeyDown={closeModalWithEscKey}>
        <div className="Modal__background" onClick={closeModal} />
        <Box 
          className="Modal__content"
          sx={{ 
            backgroundColor: 'secondary.light',
            p: 3,
            m: 2,
            maxWidth,
          }}
        >
          <div className="Modal__close" onClick={closeModal} >
            <FontAwesomeIcon icon={faTimes} className="Modal__close-icon" />
          </div>
          <Typography variant="h4" sx={{ mb: 3 }}>
            { header }
          </Typography>
          <Box>
            {children}
          </Box>
        </Box>
      </div>
    : null}
    </React.Fragment>
  );

}
  
Modal.defaultProps = {
  open: false,
  header: '',
  onClose: () => {},
};

Modal.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
};

  export default Modal;

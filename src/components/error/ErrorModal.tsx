import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { clearError } from '../../redux/reducers/errorReducer';
import { ApiError } from '../../types/errorTypes';
import Modal from 'react-modal';
import styles from './ErrorModal.module.scss';
import { logout, removeGuestSessionId } from '../../redux/actions/authActions';

Modal.setAppElement('#root');

const ErrorModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.error.error);

    const handleReset = async () => {
        await dispatch(logout());
        await dispatch(removeGuestSessionId());
        await dispatch(clearError());
        await dispatch({ type: 'RESET_APP' });
        window.location.href = '/';
    };

    if (!error) return null;

    const shouldDisplayErrorInModal = (error: ApiError | string): boolean => {
        if (typeof error === 'string') return true;

        return !error.error.errors.some(err =>
            err.code.startsWith('UserValidation') || err.code.startsWith('FormValidationError')
        );
    };

    if (!shouldDisplayErrorInModal(error)) return null;

    const renderErrorContent = (error: ApiError | string) => {
        if (typeof error === 'string') {
            return <p className={styles.errorMessage}>{error}</p>;
        } else {
            return (
                <div>
                    <h2 className={styles.errorTitle}>{error.error.title}</h2>
                    <p className={styles.errorStatus}>Status: {error.error.status}</p>
                    {error.error.errors.map((err, index) => (
                        <div key={index} className={styles.errorDetail}>
                            <p>Code: {err.code}</p>
                            {err.description && <p>Description: {err.description}</p>}
                            <p>Type: {err.type}</p>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <Modal
            isOpen={!!error}
            onRequestClose={handleReset}
            contentLabel="Error Modal"
            className={styles.errorModal}
            overlayClassName={styles.overlay}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
        >
            <div className={styles.header}>
                <h2>Error</h2>
            </div>
            <div className={styles.content}>
                {renderErrorContent(error)}
            </div>
            <div className={styles.footer}>
                <button onClick={handleReset} className={styles.okButton}>OK</button>
            </div>
        </Modal>
    );
};

export default ErrorModal;

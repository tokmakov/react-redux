import { useSelector } from 'react-redux';
import { selectors as postSelectors } from '../redux/postSlice.js';
import { Modal } from './Modal.js';
import { PostForm } from './PostForm.js';

export function ModalForm(props) {
    const { id, show, onCloseClick, onSaveClick } = props;
    // если мы редактируем пост блога — достаем его из state
    const post = useSelector((state) => postSelectors.selectById(state, id)) ?? {};

    return (
        <Modal show={show} onCloseClick={onCloseClick}>
            <PostForm {...post} onSaveClick={onSaveClick} />
        </Modal>
    );
}

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadProcess } from '../redux/postSlice.js';
import { selectors as postSelectors } from '../redux/postSlice.js';
import { PostItem } from './PostItem.js';
import { createProcess, updateProcess, removeProcess } from '../redux/postSlice.js';
import { ModalForm } from './ModalForm.js';

export function PostList(props) {
    const ids = useSelector(postSelectors.selectIds);
    const loading = useSelector((state) => state.post.loading);
    const loadError = useSelector((state) => state.post.loadError);
    const status = useSelector((state) => state.post.status);
    const error = useSelector((state) => state.post.error);

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false); // модальное окно создания/редактирования
    const [editPost, setEditPost] = useState(null); // идентификатор редактируемого поста блога

    // при клике на кнопку «Новый пост»
    const onCreateClick = () => {
        setEditPost(null);
        setShowModal(true);
    };

    // при клике на кнопку «Редактировать»
    const onUpdateClick = (id) => {
        setEditPost(id);
        setShowModal(true);
    };

    // при клике на кнопку «Сохранить»
    const onSaveClick = (data) => {
        let createUpdateProcess = editPost ? updateProcess : createProcess;
        dispatch(createUpdateProcess(data));
        setShowModal(false);
        setEditPost(null);
    };

    // при клике на кнопке закрытия окна
    const onCloseClick = () => {
        setShowModal(false);
        setEditPost(null);
    };

    // при клике на кнопке «Удалить»
    const onRemoveClick = (id) => {
        dispatch(removeProcess(id));
    };

    // загрузка постов с сервера
    useEffect(() => {
        dispatch(loadProcess());
        // eslint-disable-next-line
    }, []);

    if (loading) return <p>Получение списка постов с сервера...</p>;
    if (loadError) return <p className="error">{loadError}</p>;

    return (
        <>
            {status && <p className="status">{status}</p>}
            {error && <p className="error">{error}</p>}
            <div className="post-list">
                {ids.length > 0 ? (
                    ids.map((id) => (
                        <PostItem
                            key={id}
                            id={id}
                            onUpdateClick={onUpdateClick}
                            onRemoveClick={onRemoveClick}
                        />
                    ))
                ) : (
                    <p>Список постов пустой</p>
                )}
            </div>
            <ModalForm
                id={editPost}
                show={showModal}
                setShow={setShowModal}
                onCloseClick={onCloseClick}
                onSaveClick={onSaveClick}
            />
            <button onClick={onCreateClick}>Новый пост</button>
        </>
    );
}

import { useSelector } from 'react-redux';
import { selectors as postSelectors } from '../redux/postSlice.js';
import { selectors as userSelectors } from '../redux/userSlice.js';
import { selectors as tagSelectors } from '../redux/tagSlice.js';

export function PostItem(props) {
    const { id, onUpdateClick, onRemoveClick } = props;
    // получаем объект поста блога по идентификатору
    const post = useSelector((state) => postSelectors.selectById(state, id));
    const { title, author, tags } = post;
    // получаем объект автора поста по идентификатору
    const postAuthor = useSelector((state) => userSelectors.selectById(state, author));
    // получаем массив оъектов тегов, привязанных к посту
    const allTags = useSelector(tagSelectors.selectAll);
    const postTags = allTags.filter((tag) => tags.includes(tag.id));

    return (
        <div className="post-item">
            <div>
                <strong>{title}</strong>
            </div>
            <div>
                Автор
                <span className="post-author">{postAuthor.name}</span>
                Метки
                {postTags.map((item) => (
                    <span key={item.id} className="post-tag">
                        {item.name}
                    </span>
                ))}
            </div>
            <div>
                <button className="update" onClick={() => onUpdateClick(id)}>
                    Править
                </button>
                <button className="remove" onClick={() => onRemoveClick(id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

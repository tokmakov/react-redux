import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors as userSelectors } from '../redux/userSlice.js';
import { selectors as tagSelectors } from '../redux/tagSlice.js';

export function PostForm(props) {
    // здесь user — это идентификатор автора поста (если идет редактирование),
    // а tags — массив идентификаторов тегов, привязанных к этому посту блога
    const { id = null, title = '', author: user = 'empty', tags = [], onSaveClick } = props;

    const [postTitle, setPostTitle] = useState(title); // текст загловка поста
    const [postUser, setPostUser] = useState(user); // идентификатор автора поста
    const [postTags, setPostTags] = useState(tags); // привязанные к посту теги

    const allUsers = useSelector(userSelectors.selectAll);
    const allTags = useSelector(tagSelectors.selectAll);

    const handleInputChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setPostTags([...postTags, event.target.value]);
        } else {
            setPostTags(postTags.filter((item) => item !== event.target.value));
        }
    };

    const handleSelectChange = (event) => {
        setPostUser(event.target.value);
    };

    const isValidFormData = () => {
        if (postTitle.trim() === '') return false;
        if (postUser === 'empty') return false;
        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!isValidFormData()) {
            alert('Ошибка при заполнении формы');
            return;
        }
        // Массив идентификаторов тегов заменяем на массив объектов тегов,
        // а идентификатор автора поста заменяем на объект пользователя,
        // чтобы формат объекта поста соответствовал серверному формату.
        const data = {
            title: postTitle.trim(),
            author: allUsers.find((item) => item.id === postUser),
            tags: allTags.filter((tag) => postTags.includes(tag.id)),
        };
        if (id) data.id = id;
        onSaveClick(data);
    };

    const isCheckedTag = (id) => {
        return !!postTags.find((item) => item === id);
    };

    return (
        <form onSubmit={handleFormSubmit} className="post-form">
            <h3>{id ? 'Редактирование' : 'Создание нового'} поста</h3>
            <div>
                <input
                    type="text"
                    value={postTitle}
                    onChange={handleInputChange}
                    placeholder="Заголовок поста блога"
                />
            </div>
            <div>
                <select value={postUser} onChange={handleSelectChange}>
                    <option value="empty">Выберите автора</option>
                    {allUsers.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {allTags.map((item) => (
                    <label key={item.id}>
                        <input
                            type="checkbox"
                            value={item.id}
                            checked={isCheckedTag(item.id)}
                            onChange={handleCheckboxChange}
                        />
                        {item.name}
                    </label>
                ))}
            </div>
            <input type="submit" value="Сохранить" />
        </form>
    );
}

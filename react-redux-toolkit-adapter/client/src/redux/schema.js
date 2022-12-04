import { schema } from 'normalizr';

/*
 * Сущность «Пользователь» — это объект с обязательным полем id
 */
const userSchema = new schema.Entity('users', {});

/*
 * Сущность «Тег (метка)» — это объект с обязательным полем id
 */
const tagSchema = new schema.Entity('tags', {});
const tagListSchema = [tagSchema]; // схема массива тегов

/*
 * Сущность «Пост блога» — это объект с обязательным полем id
 */
export const postSchema = new schema.Entity('posts', {
    // поле author в посте блога расценивать как сущность «Пользователь»
    author: userSchema,
    // поле tags в посте расценивать как массив сущностей «Тег (метка)»
    tags: tagListSchema,
});

export const postListSchema = [postSchema]; // схема массива постов блога

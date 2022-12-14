# React и Redux вместе — react-redux и redux-toolkit

[React и Redux вместе. Часть 1 из 7](http://www.host12.ru/blog/item/717)

Механизм локального хранилища компонента, который поставляется вместе с React неудобен тем, что такое хранилище изолировано. Если разные независимые компоненты должны реагировать на событие — придётся либо передавать локальное состояние в виде пропсов дочерним компонентам, либо переносить локальное состояние вверх…

[React и Redux вместе. Часть 2 из 7](https://tokmakov.msk.ru/blog/item/718)

Будем создавать приложение списка задач — почти такое же, как в первой части — но уже с использованием Redux. Пакет `redux` позволяет работать с классическим Redux. Пакет `react-redux` обеспечивает взаимодействие компонентов с хранилищем. Во второй части будем использовать классический Redux и функцию `connect` из пакета `react-redux`.

[React и Redux вместе. Часть 3 из 7](https://tokmakov.msk.ru/blog/item/719)

Будем создавать приложение списка задач — почти такое же, как в первой части — но уже с использованием Redux. Пакет `redux` позволяет работать с классическим Redux. Пакет `react-redux` обеспечивает взаимодействие компонентов с хранилищем. В третьей части будем использовать классический Redux и два хука из пакета `react-redux`.

[React и Redux вместе. Часть 4 из 7](https://tokmakov.msk.ru/blog/item/720)

Будем создавать приложение списка задач — почти такое же, как в первой части — но уже с использованием Redux. Пакет `@reduxjs/toolkit` позволяет работать с Redux по-новому. Пакет `react-redux` отвечает за взаимодействие компонентов с хранилищем. В четвертой части будем использовать Redux Toolkit и два хука из пакета `react-redux`.

[React и Redux вместе. Часть 5 из 7](https://tokmakov.msk.ru/blog/item/721)

Наше приложение списка дел работает синхронно. Каждый раз при отправке экшена — состояние немедленно обновляется. Давайте теперь создадим асинхронное приложение, которое будет использовать API JsonPlaceholder. При вызове асинхронного API, есть два ключевых момента времени — момент отправки запроса и момент получения ответа.

[React и Redux вместе. Часть 6 из 7](https://tokmakov.msk.ru/blog/item/722)

Продолжаем разговор про нормализацию и функцию `createEntityAdapter`. Чтобы закрепить полученные знания, напишем небольшое приложение. Это будет список посто блога к метками (тегами). Список постов получим с сервера, нормализуем данные для удобства работы, добавим возможность создавать, редактировать и удалять посты.

[React и Redux вместе. Часть 7 из 7](https://tokmakov.msk.ru/blog/item/723)

Будем дальше разрабатывать наше приложение списка задач. Потому как сейчас это трудно назвать приложением. И по ходу разработки продолжим знакомиться с RTK Query. Первым делом откажемся от использования хуков `useQueryState` и `useQuerySubscription`, а будем вместо них использовать хук `useQuery`.

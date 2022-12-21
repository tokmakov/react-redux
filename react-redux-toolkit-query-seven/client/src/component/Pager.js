import { useGetAllTodoQuery } from '../redux/todoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../redux/userSlice';
import { useEffect } from 'react';

export function Pager(props) {
    // какая страница сейчас показывается
    const page = useSelector((state) => state.user.page);
    const dispatch = useDispatch();

    // если на последней странице были удалены все задачи — нужно прейти на предыдущую страницу
    const { isError } = useGetAllTodoQuery({ page: page });
    useEffect(() => {
        isError && page > 1 && dispatch(setPage(page - 1));
    }, [isError]);

    // если есть следующая страница — мы можем показывать кнопку «Next» для перехода на нее
    const { isFetching, isSuccess } = useGetAllTodoQuery({ page: page + 1 });
    const hasNextPage = !isFetching && isSuccess;

    return (
        <div className="pager">
            {page > 1 && <button onClick={() => dispatch(setPage(page - 1))}>Prev</button>}
            <strong>{page}</strong>
            {hasNextPage && <button onClick={() => dispatch(setPage(page + 1))}>Next</button>}
        </div>
    );
}

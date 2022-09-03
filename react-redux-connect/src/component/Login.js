import { connect } from 'react-redux';
import { actions } from '../redux/actions.js';

function Login(props) {
    const { auth, dispatch } = props;
    const login = () => dispatch(actions.user.login());
    const logout = () => dispatch(actions.user.logout());
    return (
        <div className="user-login">
            {auth ? (
                <>
                    <span>Пользователь авторизован</span>
                    &nbsp;
                    <button onClick={logout}>Выйти</button>
                </>
            ) : (
                <>
                    <span>Пользователь не авторизован</span>
                    &nbsp;
                    <button onClick={login}>Войти</button>
                </>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth,
    };
}

const LoginConnected = connect(mapStateToProps)(Login);

export { LoginConnected as Login };

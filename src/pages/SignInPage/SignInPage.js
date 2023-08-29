import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';

import InputFormComponent from '~/components/InputFormComponent';
import ButtonComponent from '~/components/ButtonComponent';
import * as UserService from '~/services/UserService';
import { useMutationHooks } from '~/hooks/useMutationHook';
import { updateUser } from '~/redux/slice/userSlice';
import * as toast from '~/components/ToastMessageComponent';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function SignInPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const dispatch = useDispatch();
    console.log(location);

    const { data, isSuccess } = mutation;
    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state);
                // navigate('/');
            } else {
                toast.error('Nhập lại tên tài khoản / Mật khẩu');
                navigate('/');
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storage);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleOnChangeUsername = (value) => {
        setUsername(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleSignIn = () => {
        mutation.mutate({
            username,
            password,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('container')}>
                <h2 className={cx('heading')}>Đăng nhập</h2>
                <div className={cx('form-container')}>
                    <div className={cx('form-item')}>
                        <label for="name" className={cx('form-title')}>
                            Tên tài khoản *
                        </label>
                        <InputFormComponent id="name" value={username} onChange={handleOnChangeUsername} />
                    </div>
                    <div className={cx('form-item')}>
                        <label for="password" className={cx('form-title')}>
                            Mật khẩu *
                        </label>
                        <InputFormComponent
                            id="password"
                            type="password"
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                </div>
                {/* {data?.status === 'err' && <span>{data?.message}</span>} */}
                <ButtonComponent
                    className={cx('login-btn')}
                    onClick={handleSignIn}
                    disabled={!username || !password.length}
                    primary
                >
                    Đăng nhập
                </ButtonComponent>
            </div>
            <div className={cx('action')}>
                <Link className={cx('lost-password')} to="/sign-up">
                    Quên mật khẩu ?
                </Link>
                <div className={cx('signup-action')}>
                    <span>Bạn chưa có tài khoản ?</span>
                    <Link className={cx('signup-link')} to="/sign-up">
                        Tạo tài khoản
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;

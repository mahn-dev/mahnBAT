import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import * as UserService from '~/services/userService';
import { useMutationHooks } from '~/hooks/useMutationHook';
import { updateUser } from '~/redux/slice/userSlice';

const cx = classNames.bind(styles);

function SignInPage() {
    const navigate = useNavigate();
    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isSuccess } = mutation;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
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
            <h2>Trang Đăng nhập</h2>
            <InputForm placeholder="Tên tài khoản" value={username} onChange={handleOnChangeUsername} />
            <InputForm type="password" placeholder="Mật khẩu" value={password} onChange={handleOnChangePassword} />
            {data?.status === 'err' && <span>{data?.message}</span>}
            <Button onClick={handleSignIn} disabled={!username || !password.length} primary>
                Đăng nhập
            </Button>
            <Link className={cx('lost-password')} to="https://klbtheme.com/partdo/">
                Quên mật khẩu ?
            </Link>
            <Link to="/sign-up">Tạo tài khoản</Link>
        </div>
    );
}

export default SignInPage;

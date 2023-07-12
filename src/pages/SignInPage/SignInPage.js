import { useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import * as UserService from '~/services/userService';
import { useMutationHooks } from '~/hooks/useMutationHook';

const cx = classNames.bind(styles);

function SignInPage() {
    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isLoading } = mutation;

    console.log(mutation);

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
        console.log(username, password);
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

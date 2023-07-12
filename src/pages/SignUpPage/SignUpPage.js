import { useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import * as UserService from '~/services/userService';
import { useMutationHooks } from '~/hooks/useMutationHook';

const cx = classNames.bind(styles);

function SignUpPage() {
    const mutation = useMutationHooks((data) => UserService.signupUser(data));

    const { data, isLoading } = mutation;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnChangeUsername = (value) => {
        setUsername(value);
    };
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const handleSignUp = () => {
        mutation.mutate({
            username,
            email,
            password,
            confirmPassword,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Trang Đăng kí</h2>
            <InputForm placeholder="Tên tài khoản" value={username} onChange={handleOnChangeUsername} />
            <InputForm placeholder="Email" value={email} onChange={handleOnChangeEmail} />
            <InputForm type="password" placeholder="Mật khẩu" value={password} onChange={handleOnChangePassword} />
            <InputForm
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={handleOnChangeConfirmPassword}
            />
            {data?.status === 'err' && <span>{data?.message}</span>}
            <Button
                onClick={handleSignUp}
                disabled={!username || !email.length || !password.length || !confirmPassword.length}
                primary
            >
                Đăng kí
            </Button>
            <Link to="/sign-in">Đăng nhập</Link>
        </div>
    );
}

export default SignUpPage;

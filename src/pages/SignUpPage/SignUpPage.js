import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';

import InputFormComponent from '~/components/InputFormComponent';
import ButtonComponent from '~/components/ButtonComponent';
import * as UserService from '~/services/UserService';
import { useMutationHooks } from '~/hooks/useMutationHook';
import { ToastContainer } from 'react-toastify';
import * as toast from '~/components/ToastMessageComponent';

const cx = classNames.bind(styles);

function SignUpPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const { data, isSuccess, isError } = mutation;
    console.log(data);

    useEffect(() => {
        if (isSuccess) {
            toast.success();
            handleNavigateSignIn();
        } else if (isError) {
            toast.error();
        }
    }, [isSuccess, isError]);

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };

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
            <ToastContainer />
            <div className={cx('container')}>
                <h2 className={cx('heading')}>Đăng ký</h2>
                <div className={cx('form-container')}>
                    <div className={cx('form-item')}>
                        <label for="username" className={cx('form-title')}>
                            Tên tài khoản *
                        </label>
                        <InputFormComponent id="username" value={username} onChange={handleOnChangeUsername} />
                    </div>
                    <div className={cx('form-item')}>
                        <label for="email" className={cx('form-title')}>
                            Email *
                        </label>
                        <InputFormComponent id="email" value={email} onChange={handleOnChangeEmail} />
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
                    <div className={cx('form-item')}>
                        <label for="confirmPassword" className={cx('form-title')}>
                            Nhập lại mật khẩu *
                        </label>
                        <InputFormComponent
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                        />
                    </div>
                </div>
                {data?.status === 'err' && <span>{data?.message}</span>}
                <p className={cx('policy')}>
                    Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, để
                    quản lý quyền truy cập vào tài khoản của bạn và cho các mục đích khác được mô tả trong{' '}
                    <Link className={cx('policy-link')} to="/sign-in">
                        chính sách bảo mật
                    </Link>{' '}
                    của chúng tôi.
                </p>
                <ButtonComponent
                    className={cx('signup-btn')}
                    onClick={handleSignUp}
                    disabled={!username || !password.length || !confirmPassword.length}
                    primary
                >
                    Đăng ký
                </ButtonComponent>
            </div>
            <div className={cx('signin-action')}>
                <span>Bạn đã có tài khoản ?</span>
                <Link className={cx('signin-link')} to="/sign-in">
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default SignUpPage;

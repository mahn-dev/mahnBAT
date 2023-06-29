import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';

import { Link } from 'react-router-dom';
import InputForm from '~/components/InputForm';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignInPage() {
    return (
        <div className={cx('wrapper')}>
            <h2>Trang Đăng nhập</h2>
            <InputForm placeholder="Tên tài khoản" />
            <InputForm placeholder="Mật khẩu" />
            <Button primary>Đăng nhập</Button>
            <Link className={cx('lost-password')} to="https://klbtheme.com/partdo/">
                Quên mật khẩu ?
            </Link>
            <Link to="https://klbtheme.com/partdo/">Tạo tài khoản</Link>
        </div>
    );
}

export default SignInPage;

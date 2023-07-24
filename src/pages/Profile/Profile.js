import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Profile() {
    const [username, setUsername] = useState('');
    const handleOnChangeUsername = () => {};
    const handleUpdate = () => {};

    return (
        <div className={cx('wrapper')}>
            <h3>Trang thông tin người dùng</h3>
            <div>
                <span>Tên tài khoản</span>
                <InputForm placeholder="Tên tài khoản" value={username} onChange={handleOnChangeUsername} />
                <Button onClick={handleUpdate} primary>
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default Profile;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '~/hooks/useMutationHook';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slice/userSlice';
import { Upload } from 'antd';
import { getBase64 } from '~/utils';
import { UploadImageIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });

    const { data, isSuccess, isError } = mutation;
    useEffect(() => {
        setUsername(user?.username);
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnChangeUsername = (value) => {
        setUsername(value);
    };
    const handleOnChangeName = (value) => {
        setName(value);
    };
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePhone = (value) => {
        setPhone(value);
    };
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    };
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            email,
            username,
            name,
            phone,
            address,
            avatar,
            access_token: user?.access_token,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3>Trang thông tin người dùng</h3>
            <div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} htmlFor="name">
                        Tên người dùng*
                    </label>
                    <InputForm
                        className={cx('form-input')}
                        id="name"
                        placeholder="Nhập tên tài khoản"
                        value={name}
                        onChange={handleOnChangeName}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} htmlFor="email">
                        Email
                    </label>
                    <InputForm
                        className={cx('form-input')}
                        id="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} htmlFor="phone">
                        Số điện thoại*
                    </label>
                    <InputForm
                        className={cx('form-input')}
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={handleOnChangePhone}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} htmlFor="address">
                        Địa chỉ nhận hàng*
                    </label>
                    <InputForm
                        className={cx('form-input')}
                        id="address"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={handleOnChangeAddress}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} htmlFor="avatar">
                        Avatar
                    </label>
                    <Upload className={cx('upload')} onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button leftIcon={<UploadImageIcon />} outline>
                            Upload
                        </Button>
                    </Upload>
                    {avatar && (
                        <img
                            src={avatar}
                            style={{
                                marginLeft: '20px',
                                height: '100px',
                                width: '100px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '1px solid var(--border-color) ',
                            }}
                            alt="avatar"
                        />
                    )}
                </div>
                <Button onClick={handleUpdate} primary>
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default Profile;

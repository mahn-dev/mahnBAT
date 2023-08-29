import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '~/hooks/useMutationHook';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import InputFormComponent from '~/components/InputFormComponent';
import ButtonComponent from '~/components/ButtonComponent';
import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slice/userSlice';
import { Upload } from 'antd';
import { getBase64 } from '~/utils';
import { UploadImageIcon } from '~/components/Icons';
import * as toast from '~/components/ToastMessageComponent';

const cx = classNames.bind(styles);

function Profile() {
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

    const dispatch = useDispatch();
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
            toast.success('Lưu thông tin thành công! Vui lòng F5 để cập nhật.');
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            toast.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
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
            <ToastContainer />
            <h3>Trang thông tin người dùng</h3>
            <div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} for="name">
                        Tên người dùng*
                    </label>
                    <InputFormComponent
                        className={cx('form-input')}
                        id="name"
                        placeholder="Nhập tên tài khoản"
                        value={name}
                        onChange={handleOnChangeName}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} for="email">
                        Email
                    </label>
                    <InputFormComponent
                        className={cx('form-input')}
                        id="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} for="phone">
                        Số điện thoại*
                    </label>
                    <InputFormComponent
                        className={cx('form-input')}
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={handleOnChangePhone}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} for="address">
                        Địa chỉ nhận hàng*
                    </label>
                    <InputFormComponent
                        className={cx('form-input')}
                        id="address"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={handleOnChangeAddress}
                    />
                </div>
                <div className={cx('form')}>
                    <label className={cx('form-label')} for="avatar">
                        Avatar
                    </label>
                    <Upload className={cx('upload')} onChange={handleOnChangeAvatar} maxCount={1}>
                        <ButtonComponent leftIcon={<UploadImageIcon />} outline>
                            Upload
                        </ButtonComponent>
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
                <ButtonComponent onClick={handleUpdate} primary>
                    Lưu
                </ButtonComponent>
            </div>
        </div>
    );
}

export default Profile;

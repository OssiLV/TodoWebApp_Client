import {
    FC,
    Fragment,
    useState,
    useEffect,
    MouseEvent,
    ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IUser,
    ITheme,
    RootStates,
    IModalAccountComponent,
} from "../../Global";
import {
    CubeIcon,
    XMarkIcon,
    GlobeAltIcon,
    UserCircleIcon,
    ArrowSmallLeftIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Select, initTE } from "tw-elements";
import {
    setAvatar,
    setEmail,
    setLanguage,
    setLogout,
    setTheme,
    setUserName,
} from "../../States/UserReducer";
import ThemeCardComponent from "../ThemeCardComponent";
import Dropzone, { useDropzone } from "react-dropzone";
import AvatarDrop from "../AvatarDrop";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface IAccountTab {
    _user: IUser;
    _handleNavigateTab: Function;
}

interface ILanguageTab {
    _user: IUser;
}

interface IThemeTab {
    _user: IUser;
}

interface IChangeEmailTab {
    _user: IUser;
}
interface IChanePassword {
    _user: IUser;
}
const ChangeEmailTab: FC<IChangeEmailTab> = ({ _user }) => {
    const dispatch = useDispatch();

    const [newEmailValue, setNewEmailValue] = useState("");
    const [confirmNewEmailValue, setConfirmNewEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [message, setMessage] = useState("");

    const [checkValueNewEmail, setCheckValueNewEmail] = useState(false);
    const [checkValueConfirmEmail, setCheckValueConfirmEmail] = useState(false);
    const [checkValuePassword, setCheckValuePassword] = useState(false);

    const handleChangeNewEmailValue = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setNewEmailValue(event.target.value);
    };

    const handleChangeConfirmNewEmaildValue = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmNewEmailValue(event.target.value);
    };

    const handleChangePasswordValue = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordValue(event.target.value);
    };

    const handleUpdateEmail = () => {
        axios({
            method: "PUT",
            url: "User/email",
            data: {
                id: _user.id,
                newEmail: confirmNewEmailValue,
                password: passwordValue,
            },
        })
            .then((res) => {
                console.log(res.data);
                setMessage(res.data.message);
                dispatch(setEmail({ email: res.data.objectData }));
            })
            .catch((error) => {
                console.error("Cannot update email: " + error);
            });
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(_user.email);
    };

    useEffect(() => {
        if (confirmNewEmailValue !== newEmailValue) {
            setCheckValueConfirmEmail(true);
        } else {
            setCheckValueConfirmEmail(false);
        }
    }, [confirmNewEmailValue, newEmailValue]);

    useEffect(() => {
        if (newEmailValue === "") {
            setCheckValueNewEmail(true);
        } else {
            setCheckValueNewEmail(false);
        }
    }, [newEmailValue]);

    useEffect(() => {
        if (passwordValue === "" || passwordValue.length < 4) {
            setCheckValuePassword(true);
            setMessage("");
        } else {
            setCheckValuePassword(false);
        }
    }, [passwordValue]);

    return (
        <div className="flex flex-col gap-4 tracking-wide">
            <div className="flex flex-col gap-1">
                <p className="mb-4 select-none">
                    {_user.language === "en"
                        ? "Your email is currently"
                        : "Email hiện tại của bạn là"}{" "}
                    <span
                        onClick={handleCopyEmail}
                        className="font-bold cursor-pointer hover:underline hover:text-primary"
                    >
                        {_user.email}
                    </span>
                </p>

                <label htmlFor="new-email" className="font-bold text-base">
                    {_user.language === "en" ? "New email" : "Email mới"}
                </label>
                <input
                    id="new-email"
                    className={clsx(
                        "outline-none border border-opacity-10 p-[2px] px-2 w-72 focus:border-opacity-100 rounded-md",
                        {
                            "bg-neutral-800 text-white border-white ":
                                _user.theme === "Dark",
                            " text-black border-black":
                                _user.theme === "Primary",
                        }
                    )}
                    type="email"
                    autoFocus
                    aria-autocomplete="none"
                    onChange={handleChangeNewEmailValue}
                    value={newEmailValue}
                    required
                />
                {checkValueNewEmail && (
                    <label
                        htmlFor="new-email"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {_user.language === "en"
                            ? "Cannot empty value"
                            : "Dữ liệu không được để trống"}
                    </label>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label
                    htmlFor="confirm-new-password"
                    className="font-bold text-base"
                >
                    {_user.language === "en"
                        ? "Confirm new email"
                        : "Nhập lại email mới"}
                </label>
                <input
                    id="confirm-new-password"
                    className={clsx(
                        "outline-none border border-opacity-10 p-[2px] px-2 w-72 focus:border-opacity-100 rounded-md",
                        {
                            "bg-neutral-800 text-white border-white ":
                                _user.theme === "Dark",
                            " text-black border-black":
                                _user.theme === "Primary",
                        }
                    )}
                    type="email"
                    aria-autocomplete="none"
                    onChange={handleChangeConfirmNewEmaildValue}
                    value={confirmNewEmailValue}
                />
                {checkValueConfirmEmail && (
                    <label
                        htmlFor="confirm-new-password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {_user.language === "en"
                            ? "Email does not match"
                            : "Email không khớp"}
                    </label>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-bold text-base">
                    Password
                </label>
                <input
                    id="password"
                    className={clsx(
                        "outline-none border border-opacity-10 p-[2px] px-2 w-72 focus:border-opacity-100 rounded-md",
                        {
                            "bg-neutral-800 text-white border-white ":
                                _user.theme === "Dark",
                            " text-black border-black":
                                _user.theme === "Primary",
                        }
                    )}
                    type="password"
                    aria-autocomplete="none"
                    onChange={handleChangePasswordValue}
                    value={passwordValue}
                />
                {checkValuePassword && (
                    <label
                        htmlFor="password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {_user.language === "en"
                            ? "Password at least 4 characters"
                            : "Mật khẩu phải có ít nhất 4 ký tự"}
                    </label>
                )}

                {message && (
                    <label
                        htmlFor="password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {message}
                    </label>
                )}
            </div>
            {!checkValueNewEmail &&
                !checkValueConfirmEmail &&
                !checkValuePassword && (
                    <button
                        onClick={handleUpdateEmail}
                        className={clsx(
                            "p-2 px-4  rounded-lg text-white font-bold hover:opacity-80",
                            {
                                "bg-primary ": _user.theme === "Primary",
                                "bg-neutral-700 ": _user.theme === "Dark",
                                "bg-gray-400 ": _user.theme === "Neutral",
                            }
                        )}
                    >
                        {_user.language === "en" ? "Save" : "Lưu"}
                    </button>
                )}
        </div>
    );
};

const ChanePassword: FC<IChanePassword> = ({ _user }) => {
    const [currentPasswordValue, setCurrentPasswordValue] = useState("");
    const [newPasswordValue, setNewPasswordValue] = useState("");
    const [message, setMessage] = useState("");
    const [checkValueCurrentPassword, setCheckValueCurrentPassword] =
        useState(false);
    const [checkValueNewPassword, setCheckValueNewPassword] = useState(false);

    const handleChangeCurrentPasswordValue = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setCurrentPasswordValue(event.target.value);
    };

    const handleChangeNewPasswordValue = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setNewPasswordValue(event.target.value);
    };

    const handleUpdatePassword = () => {
        axios({
            method: "PUT",
            url: "User/password",
            data: {
                id: _user.id,
                currentPassword: currentPasswordValue,
                newPassword: newPasswordValue,
            },
        })
            .then((res) => {
                // console.log(res.data);
                setMessage(res.data.message);
            })
            .catch((error) => {
                console.error("Cannot update password: " + error);
            });
    };

    useEffect(() => {
        if (currentPasswordValue === "" || currentPasswordValue.length < 4) {
            setCheckValueCurrentPassword(true);
            setMessage("");
        } else {
            setCheckValueCurrentPassword(false);
        }
    }, [currentPasswordValue]);

    useEffect(() => {
        if (newPasswordValue === "" || newPasswordValue.length < 4) {
            setCheckValueNewPassword(true);
        } else {
            setCheckValueNewPassword(false);
        }
    }, [newPasswordValue]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="current-password"
                    className="font-bold text-base"
                >
                    {_user.language === "en"
                        ? "Current password"
                        : "Mật khẩu hiện tại"}
                </label>
                <input
                    id="current-password"
                    className={clsx(
                        "outline-none border border-opacity-10 p-[2px] px-2 w-72 focus:border-opacity-100 rounded-md",
                        {
                            "bg-neutral-800 text-white border-white ":
                                _user.theme === "Dark",
                            " text-black border-black":
                                _user.theme === "Primary",
                        }
                    )}
                    type="password"
                    autoFocus
                    aria-autocomplete="none"
                    onChange={handleChangeCurrentPasswordValue}
                    value={currentPasswordValue}
                    required
                />
                {checkValueCurrentPassword && (
                    <label
                        htmlFor="current-password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {_user.language === "en"
                            ? "Password at least 4 characters"
                            : "Mật khẩu phải có ít nhất 4 ký tự"}
                    </label>
                )}
                {message && (
                    <label
                        htmlFor="current-password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {message}
                    </label>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="new-password" className="font-bold text-base">
                    {_user.language === "en" ? "New password" : "Mật khẩu mới"}
                </label>
                <input
                    id="new-password"
                    className={clsx(
                        "outline-none border border-opacity-10 p-[2px] px-2 w-72 focus:border-opacity-100 rounded-md",
                        {
                            "bg-neutral-800 text-white border-white ":
                                _user.theme === "Dark",
                            " text-black border-black":
                                _user.theme === "Primary",
                        }
                    )}
                    type="password"
                    aria-autocomplete="none"
                    onChange={handleChangeNewPasswordValue}
                    value={newPasswordValue}
                />
                {checkValueNewPassword && (
                    <label
                        htmlFor="new-password"
                        className="text-sm opacity-80 text-red-600"
                    >
                        {_user.language === "en"
                            ? "Password at least 4 characters"
                            : "Mật khẩu phải có ít nhất 4 ký tự"}
                    </label>
                )}
            </div>
            {!checkValueCurrentPassword && !checkValueNewPassword && (
                <button
                    onClick={handleUpdatePassword}
                    className={clsx(
                        "p-2 px-4 rounded-lg text-white font-bold hover:opacity-80",
                        {
                            "bg-primary ": _user.theme === "Primary",
                            "bg-neutral-700 ": _user.theme === "Dark",
                            "bg-gray-400 ": _user.theme === "Neutral",
                        }
                    )}
                >
                    {_user.language === "en" ? "Save" : "Lưu"}
                </button>
            )}
        </div>
    );
};

const AccountTab: FC<IAccountTab> = ({ _user, _handleNavigateTab }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [userNameValue, setUserNameValue] = useState(_user.userName);
    const [check, setCheck] = useState(false);
    const [checkImage, setCheckImage] = useState(true);

    const handleChangeValueUserName = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setUserNameValue(event.target.value);
    };

    useEffect(() => {
        if (userNameValue === _user.userName) {
            setCheck(false);
        } else {
            setCheck(true);
        }
    }, [userNameValue, _user]);

    const handleNavigateTab = (id: number) => {
        _handleNavigateTab(id);
    };

    const handleUpdateUserName = () => {
        if (check) {
            axios({
                method: "PUT",
                url: "User/username",
                data: {
                    id: _user.id,
                    userName: userNameValue,
                },
            })
                .then((res) => {
                    // console.log(res.data.objectData);
                    dispatch(setUserName({ userName: res.data.objectData }));
                })
                .catch((error) => {
                    console.error("Cannot update user name: " + error);
                });
        }
    };
    const handleDeleteAvatar = () => {
        axios({
            method: "PUT",
            url: `User/defaultAvatar/${_user.id}`,
        })
            .then((res) => {
                // console.log(res.data.objectData);
                dispatch(setAvatar({ image: res.data.objectData }));
                setCheckImage(true);
            })
            .catch((error) => {
                console.error("Cannot delete your avatar: " + error);
            });
    };
    const handleDeleteAccount = () => {
        axios({
            method: "DELETE",
            url: `User/${_user.id}`,
        })
            .then((res) => {
                dispatch(setLogout());
                navigate("/");
                Cookies.remove("TOKEN");
            })
            .catch((error) => {
                console.error("Cannot delete your account: " + error);
            });
    };

    useEffect(() => {
        if (checkImage) {
            axios({
                method: "PUT",
                url: `User/defaultAvatar/${_user.id}`,
            })
                .then((res) => {
                    // console.log(res.data.objectData);
                    dispatch(setAvatar({ image: res.data.objectData }));
                })
                .catch((error) => {
                    console.error("Cannot delete your avatar: " + error);
                });
        }
    }, [checkImage]);

    const handleCancelUpdateUserName = () => {
        setUserNameValue(_user.userName);
        setCheck(false);
    };
    // const onDrop = useCallback((acceptedFiles: ) => {
    //     console.log(acceptedFiles);
    // }, []);
    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //     onDrop,
    // });
    return (
        <div className="flex flex-col gap-5 h-full overflow-auto">
            <div className="">
                <h1 className="my-1 font-bold">
                    {_user.language === "en" ? "Avatar" : "Ảnh đại diện"}
                </h1>
                <div className="flex gap-4 items-center ">
                    <AvatarDrop _user={_user} setCheckImage={setCheckImage} />
                    <button
                        onClick={handleDeleteAvatar}
                        className="p-2 rounded-lg border whitespace-nowrap border-red-500 text-red-500 hover:text-red-700 w-36 h-10 transition-all duration-200"
                    >
                        {_user.language === "en"
                            ? "Remove Avatar"
                            : "Xóa ảnh đại diện"}
                    </button>
                </div>
                {!checkImage && (
                    <h1 className="text-red-500 text-sm opacity-80 mt-2">
                        {_user.language === "en" && "File is not image"}
                        {_user.language === "vn" &&
                            "File bạn vừa upload Không phải định dạng ảnh"}
                    </h1>
                )}
            </div>
            <div className="">
                <h1 className="my-1 font-bold">
                    {_user.language === "en" ? "Name" : "Tên"}
                </h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userNameValue}
                        onChange={handleChangeValueUserName}
                        className={clsx(
                            "w-64 outline-none border p-1 rounded-lg",
                            {
                                "bg-neutral-800 text-white":
                                    _user.theme === "Dark",
                            }
                        )}
                    />
                    {check && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleUpdateUserName}
                                className={clsx(
                                    "px-4 py-1 rounded-lg  transition-all duration-200",
                                    {
                                        "bg-primary  text-white hover:bg-primary-500":
                                            _user.theme === "Primary",
                                        "bg-gray-100 text-black hover:bg-gray-300":
                                            _user.theme === "Dark",
                                        "bg-neutral-500 text-white hover:bg-neutral-400":
                                            _user.theme === "Neutral",
                                    }
                                )}
                            >
                                {_user.language === "en" ? "Save" : "Lưu"}
                            </button>
                            <button
                                onClick={handleCancelUpdateUserName}
                                className={clsx(
                                    "px-2 py-1 rounded-lg  transition-all duration-200",
                                    {
                                        "bg-gray-100 hover:bg-gray-300":
                                            _user.theme === "Primary",
                                    }
                                )}
                            >
                                {_user.language === "en" ? "Cancel" : "Hủy"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="my-1 font-bold">Email</h1>
                <p className="text-base opacity-90">{_user.email}</p>
                <button
                    className={clsx(
                        "p-2 w-36 rounded-lg  transition-all duration-200",
                        {
                            "bg-primary  text-white hover:bg-primary-500":
                                _user.theme === "Primary",
                            "bg-gray-100 text-black hover:bg-gray-300":
                                _user.theme === "Dark",
                            "bg-neutral-500 text-white hover:bg-neutral-400":
                                _user.theme === "Neutral",
                        }
                    )}
                    onClick={() => handleNavigateTab(-1)}
                >
                    {_user.language === "en"
                        ? "Change email"
                        : "Thay đổi email"}
                </button>
            </div>
            <div className="">
                <h1 className="my-1 font-bold">
                    {_user.language === "en" ? "Password" : "Mật khẩu"}
                </h1>
                <button
                    className={clsx(
                        "p-2  rounded-lgtransition-all duration-200 rounded-lg",
                        {
                            "bg-primary  text-white hover:bg-primary-500":
                                _user.theme === "Primary",
                            "bg-gray-100 text-black hover:bg-gray-300":
                                _user.theme === "Dark",
                            "bg-neutral-500 text-white hover:bg-neutral-400":
                                _user.theme === "Neutral",
                        }
                    )}
                    onClick={() => handleNavigateTab(-2)}
                >
                    {_user.language === "en"
                        ? "Change password"
                        : "Thay đổi mật khẩu"}
                </button>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="my-1 font-bold">
                    {_user.language === "en"
                        ? "Delete account"
                        : "Xóa tài khoản"}
                </h1>
                <p className="text-sm ">
                    {_user.language === "en"
                        ? "This will immediately delete all of your data including tasks, projects, and more. This can’t be undone"
                        : "Điều này sẽ ngay lập tức xóa tất cả dữ liệu của bạn, bao gồm các tác vụ và dự án, v.v. Không thể hoàn tác thao tác này"}
                </p>

                <button
                    onClick={handleDeleteAccount}
                    className="p-2 rounded-lg border whitespace-nowrap border-red-500 text-red-500 hover:text-red-700 w-36 h-10 transition-all duration-200"
                >
                    {_user.language === "en"
                        ? "Delete account"
                        : "Xóa tài khoản"}
                </button>
            </div>
        </div>
    );
};

const ThemeTab: FC<IThemeTab> = ({ _user }) => {
    const themes: ITheme[] = [
        {
            en_Name: "Primary",
            vn_Name: "Mặc định",
        },
        { en_Name: "Dark", vn_Name: "Tối" },
        {
            en_Name: "Neutral",
            vn_Name: "Trung lập",
        },
    ];

    const dispatch = useDispatch();

    const [themeValue, setThemeValue] = useState(_user.theme);

    useEffect(() => {
        axios({
            method: "PUT",
            url: "User/theme",
            data: {
                id: _user.id,
                theme: themeValue,
            },
        })
            .then((res) => {
                // console.log(res.data.objectData);
                dispatch(setTheme({ theme: themeValue }));
            })
            .catch((error) => {
                console.error("Cannot update theme: " + error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeValue]);

    return (
        <div className="bg-none">
            <h1 className="my-1 font-bold">
                {_user.language === "en" ? "Your themes" : "Chủ đề của bạn"}
            </h1>

            <div className="grid grid-cols-3 gap-2 mt-2">
                {themes.map((theme) => (
                    <ThemeCardComponent
                        key={theme.en_Name}
                        theme={theme}
                        setThemeValue={setThemeValue}
                        check={_user.theme === theme.en_Name}
                    />
                ))}
            </div>
        </div>
    );
};

const LanguageTab: FC<ILanguageTab> = ({ _user }) => {
    useEffect(() => {
        initTE({ Select });
    }, []);

    const dispatch = useDispatch();

    const [languageValue, setLanguageValue] = useState(_user.language);
    const languages = [
        { id: 0, type: "en", name: "English" },
        { id: 2, type: "vn", name: "Việt Nam" },
    ];

    const handleChangeLanguageValue = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        axios({
            method: "PUT",
            url: "User/language",
            data: {
                id: _user.id,
                language: event.target.value,
            },
        })
            .then((res) => {
                setLanguageValue(res.data.objectData);
                dispatch(setLanguage({ language: res.data.objectData }));
            })
            .catch((error) => {
                console.error("Cannot update theme: " + error);
            });
    };

    return (
        <div className="">
            <h1 className="my-1 font-bold">
                {_user.language === "en"
                    ? "Choose your language"
                    : "Chọn ngôn ngữ"}
            </h1>
            <select
                className={clsx("w-80 outline-none border p-2 ", {
                    "text-white bg-neutral-800": _user.theme === "Dark",
                })}
                value={languageValue}
                onChange={handleChangeLanguageValue}
            >
                {languages.map((language) => (
                    <option
                        key={language.id}
                        value={language.type}
                        className={clsx({
                            "text-white": _user.theme === "Dark",
                        })}
                    >
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const ModalAccountComponent: FC<IModalAccountComponent> = ({
    handleCloseAccountModal,
}) => {
    const dispatch = useDispatch();

    const _user = useSelector((state: RootStates) => state.rootUserReducer);

    const [tab, setTab] = useState(1);

    const handleCloseModal = () => {
        handleCloseAccountModal();
    };

    const handleLogOut = () => {
        dispatch(setLogout());
        handleCloseModal();
        window.location.assign("/");
    };

    const handlePreventEventFromParent = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
    };

    const handleNavigateTab = (id: number) => {
        setTab(id);
    };
    const handleNavigateAccountTab = () => {
        setTab(1);
    };
    return (
        <div
            className="fixed z-30 inset-0 bg-neutral-400 bg-opacity-50 w-full "
            onClick={handleCloseModal}
        >
            <div
                className={clsx(
                    "z-40 absolute top-[10%] left-[28%] flex flex-row  rounded-xl   w-[900px] h-[680px]",
                    {}
                )}
                onClick={handlePreventEventFromParent}
            >
                {/* SETTINGS */}
                <div
                    className={clsx(
                        " w-[280px] px-3 divide-y flex flex-col justify-between",
                        {
                            "text-white bg-gray-800": _user.theme === "Dark",
                            "text-black bg-gray-100 ":
                                _user.theme === "Primary",
                            "text-black bg-gray-200": _user.theme === "Neutral",
                        }
                    )}
                >
                    <h1 className="font-bold pt-4 pb-2 pl-2 pr-4">
                        {_user.language === "en" ? "Settings" : "Cài đặt"}
                    </h1>

                    <ul className="my-2 pt-2 text-gray-500 flex flex-col gap-2 flex-1">
                        <li
                            className={clsx(
                                " flex items-center gap-2 cursor-pointer p-2 w-full hover:bg-neutral-200 rounded-xl",
                                {
                                    "bg-neutral-200 text-gray-900": tab === 1,
                                }
                            )}
                            onClick={() => handleNavigateTab(1)}
                        >
                            <span>
                                <UserCircleIcon className="w-6 h-6" />
                            </span>
                            <p className="tracking-wider">
                                {_user.language === "en"
                                    ? "Account"
                                    : "Tài khoản"}
                            </p>
                        </li>
                        <li
                            className={clsx(
                                " flex items-center gap-2 cursor-pointer p-2 w-full hover:bg-neutral-200 rounded-xl",
                                {
                                    "bg-neutral-200 text-gray-900": tab === 2,
                                }
                            )}
                            onClick={() => handleNavigateTab(2)}
                        >
                            <span>
                                <CubeIcon className="w-6 h-6" />
                            </span>
                            <p className="tracking-wider">
                                {_user.language === "en" ? "Theme" : "Chủ đề"}
                            </p>
                        </li>
                        <li
                            className={clsx(
                                " flex items-center gap-2 cursor-pointer p-2 w-full hover:bg-neutral-200 rounded-xl",
                                {
                                    "bg-neutral-200 text-gray-900": tab === 3,
                                }
                            )}
                            onClick={() => handleNavigateTab(3)}
                        >
                            <span>
                                <GlobeAltIcon className="w-6 h-6" />
                            </span>
                            <p className="tracking-wider">
                                {_user.language === "en"
                                    ? "Language"
                                    : "Ngôn ngữ"}
                            </p>
                        </li>
                    </ul>

                    {/* LOG-OUT */}
                    <div
                        onClick={handleLogOut}
                        className="group flex gap-1 items-center p-2 mb-2 cursor-pointer w-full transition-colors duration-300 ease-in-out  hover:bg-red-500 bg-opacity-20 rounded-xl"
                    >
                        <span>
                            <ArrowRightOnRectangleIcon className=" w-4 h-4 transition-colors duration-300 ease-in-out text-red-600 group-hover:text-white" />
                        </span>
                        <p className="transition-colors duration-300 ease-in-out text-red-600 group-hover:text-white tracking-wider">
                            {_user.language === "en" ? "Log out" : "Đăng xuất"}
                        </p>
                    </div>
                </div>

                {/* ACCOUNT */}
                <div className="divide-y w-full">
                    <header
                        className={clsx(
                            "pl-6 pr-4 py-4 flex items-center justify-between",
                            {
                                "text-white bg-neutral-800":
                                    _user.theme === "Dark",
                                "text-black bg-white ":
                                    _user.theme === "Primary",
                                "text-black bg-neutral-100 ":
                                    _user.theme === "Neutral",
                            }
                        )}
                    >
                        <h1 className="font-bold">
                            {tab === -2 && (
                                <div
                                    className="flex items-center gap-3"
                                    onClick={handleNavigateAccountTab}
                                >
                                    <span className="cursor-pointer opacity-80 hover:bg-gray-300 rounded-lg">
                                        <ArrowSmallLeftIcon className="w-6 h-6" />
                                    </span>
                                    <p>
                                        {_user.language === "en"
                                            ? "Change your password"
                                            : "Thay đổi mật khẩu"}
                                    </p>
                                </div>
                            )}
                            {tab === -1 && (
                                <div
                                    className="flex items-center gap-3"
                                    onClick={handleNavigateAccountTab}
                                >
                                    <span className="cursor-pointer opacity-80 hover:bg-gray-300 rounded-full">
                                        <ArrowSmallLeftIcon className="w-6 h-6" />
                                    </span>
                                    <p>
                                        {_user.language === "en"
                                            ? "Change your email address"
                                            : "Thay đổi địa chỉ email"}
                                    </p>
                                </div>
                            )}

                            {tab === 1
                                ? _user.language === "en"
                                    ? "Account"
                                    : "Tài khoản"
                                : ""}
                            {tab === 2
                                ? _user.language === "en"
                                    ? "Theme"
                                    : "Chủ đề"
                                : ""}
                            {tab === 3
                                ? _user.language === "en"
                                    ? "Language"
                                    : "Ngôn ngữ"
                                : ""}
                        </h1>
                        <span
                            className="cursor-pointer hover:bg-gray-300 rounded-full"
                            onClick={handleCloseModal}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </span>
                    </header>

                    <div
                        className={clsx("pt-4 pl-6 pr-4 h-[91.6%]", {
                            "text-white bg-neutral-800": _user.theme === "Dark",
                            "text-black bg-white ": _user.theme === "Primary",
                            "text-black bg-neutral-100 ":
                                _user.theme === "Neutral",
                        })}
                    >
                        {tab === -2 && <ChanePassword _user={_user} />}
                        {tab === -1 && <ChangeEmailTab _user={_user} />}
                        {tab === 1 && (
                            <AccountTab
                                _user={_user}
                                _handleNavigateTab={handleNavigateTab}
                            />
                        )}{" "}
                        {tab === 2 && <ThemeTab _user={_user} />}{" "}
                        {tab === 3 && <LanguageTab _user={_user} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAccountComponent;

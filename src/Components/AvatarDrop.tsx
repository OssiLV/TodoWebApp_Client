import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../Global";
import { setAvatar } from "../States/UserReducer";
interface IAvatarDrop {
    _user: IUser;
    setCheckImage: Function;
}

const AvatarDrop: FC<IAvatarDrop> = ({ _user, setCheckImage }) => {
    const baseURLServer = process.env.REACT_APP_BASE_SERVER_URL;
    const dispatch = useDispatch();

    const [URLImage, setURLImage] = useState(baseURLServer + _user.image);
    const [image, setImage] = useState<Array<any>>([]);

    const isImageFile = (file: File) => {
        const mimeType = file.type;
        const imageExtensions = ["image/png", "image/jpeg"];
        return imageExtensions.includes(mimeType);
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setImage(
            acceptedFiles.map((file) => {
                setCheckImage(isImageFile(file));
                const preview = URL.createObjectURL(file);

                return {
                    ...file,
                    preview,
                };
            })
        );

        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async () => {
                const formData = new FormData();
                formData.append("file", acceptedFiles[0]);
                formData.append("userId", _user.id);

                axios
                    .post(`User/uploadAvatar`, formData)
                    .then((res) => {
                        const dataResponse = res.data.objectData;

                        setURLImage(dataResponse);
                        dispatch(setAvatar({ image: dataResponse }));
                        // console.log(urlImage);
                    })
                    .catch((error) => {
                        console.error("Cannot upload: " + error);
                    });
            };

            reader.readAsArrayBuffer(file);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        // accept: {
        //     image: [".jpg", ".png"],
        // },
    });

    useEffect(() => {
        // console.log(_user.image);
        if (
            _user.image !==
            "UserAvatarsavatar--default_d1b4ea9d-184b-4187-9134-a31eb7a95741.jpg"
        ) {
            setURLImage(baseURLServer + _user.image);
        } else {
            setURLImage(image.map((test) => test.preview).toString());
        }
    }, [_user, baseURLServer, image]);

    return (
        <div>
            <div
                {...getRootProps()}
                className="cursor-pointer hover:bg-primary p-2 rounded-full"
            >
                <input {...getInputProps()} />
                <img
                    src={URLImage}
                    // src={URLImage === "" ? _user.image : URLImage}
                    className="w-32 h-32 rounded-full"
                    alt="Avatar"
                />
            </div>
        </div>
    );
};

export default AvatarDrop;

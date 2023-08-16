import axios from "axios";
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../Global";
import { useDispatch } from "react-redux";
import { setLogin } from "../States/UserReducer";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post("Auth", {
                email: data.get("email"),
                password: data.get("password"),
            })
            .then((res) => {
                if (!res.data.status) {
                    setError(res.data.message);
                } else {
                    const _user: IUser = res.data.objectData.userResponse;
                    // console.log(_user);

                    Cookies.set("TOKEN", res.data.objectData.accessToken, {
                        //Set expires time 3 hours
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
                    });
                    dispatch(
                        setLogin({
                            id: _user.id,
                            userName: _user.userName,
                            email: _user.email,
                            emailConfirmed: _user.emailConfirmed,
                            theme: _user.theme,
                            language: _user.language,
                            image: _user.image,
                        })
                    );
                    navigate("/app/today");
                }
            })
            .catch((error) => console.error(`Cannot Log In `, error));
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form
                className="bg-fade bg-opacity-40 rounded-[1rem] max-h-[30rem] w-[28rem] flex flex-col p-8 drop-shadow-2xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col w-full gap-4 items-center">
                    <h1 className="text-2xl font-bold text-primary font-sans ">
                        Log in
                    </h1>
                    <div className="flex flex-col gap-4 w-full">
                        <input
                            className="rounded-full h-12 px-4 bg-fade enabled:outline-none"
                            type="email"
                            name="email"
                            placeholder="Email"
                            aria-autocomplete="none"
                            autoFocus
                        />
                        <input
                            className="rounded-full h-12 p-4 bg-fade enabled:outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            aria-autocomplete="none"
                        />
                    </div>
                    <button
                        className="rounded-full h-12 w-full bg-primary transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-90 hover:bg-indigo-500 duration-300"
                        type="submit"
                    >
                        <p className="font-bold text-lg text-fade">Log in</p>
                    </button>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="w-full">
                        <Link
                            to=""
                            className="opacity-40 underline hover:text-primary hover:opacity-100"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="w-full flex justify-center mt-1">
                        <p>Don’t have an account?</p>
                        <Link
                            to="/signup"
                            className="ml-1 underline text-primary"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
            <p className="flex text-red-600">{error}</p>
        </div>
    );
};

export default LoginPage;

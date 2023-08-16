import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios({
            method: "post",
            url: "/Auth/signup",
            data: {
                email: data.get("email"),
                password: data.get("password"),
            },
        })
            .then((res) => {
                // console.log(res.data);
                if (!res.data.status) {
                    setError(res.data.message);
                } else {
                    navigate("/");
                }
            })
            .catch((error) => console.error(`Cannot SignUp `, error));
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form
                className="bg-fade bg-opacity-40 rounded-[1rem] max-h-[30rem] w-[28rem] flex flex-col p-8 drop-shadow-2xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col w-full gap-4 items-center">
                    <h1 className="text-2xl font-bold text-primary font-sans ">
                        Sign Up
                    </h1>
                    <div className="flex flex-col gap-4 w-full">
                        <input
                            className="rounded-full h-12 px-4 bg-fade enabled:outline-none"
                            type="email"
                            name="email"
                            placeholder="Email"
                            aria-autocomplete="none"
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
                        <p className="font-bold text-lg text-fade">Sign Up</p>
                    </button>
                </div>
                <div className="flex flex-col gap-4 mt-[3.5rem]">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="w-full flex justify-center mt-1">
                        <p>Already signed up?</p>
                        <Link to="/" className="ml-1 underline text-primary">
                            Go to login
                        </Link>
                    </div>
                </div>
            </form>
            <p className="flex text-red-600">{error}</p>
        </div>
    );
};

export default SignUpPage;

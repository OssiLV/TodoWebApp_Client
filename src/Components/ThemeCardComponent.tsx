import React, { FC, useState } from "react";
import { IThemeCardComponent, RootStates } from "../Global";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import { setTheme } from "../States/UserReducer";
import axios from "axios";

const ThemeCardComponent: FC<IThemeCardComponent> = ({
    theme,
    check,
    setThemeValue,
}) => {
    const _user = useSelector((state: RootStates) => state.rootUserReducer);

    const handleChangeThemeValue = () => {
        setThemeValue(theme.en_Name);
    };

    return (
        <div
            className={clsx(
                "w-[200px] h-[120px] border flex flex-col  cursor-pointer rounded-xl",
                {
                    " border-white": theme.en_Name === "Dark",
                    " border-gray-200": theme.en_Name === "Primary",
                    " border-gray-300": theme.en_Name === "Neutral",
                }
            )}
            onClick={handleChangeThemeValue}
        >
            <div
                className={clsx(
                    "h-[35%] w-full font-bold  rounded-tl-xl rounded-tr-xl p-2",
                    {
                        "text-white bg-primary": theme.en_Name === "Primary",
                        "text-white bg-gray-800": theme.en_Name === "Dark",
                        "text-gray-800 bg-neutral-100":
                            theme.en_Name === "Neutral",
                    }
                )}
            >
                {_user.language === "en" ? theme.en_Name : theme.vn_Name}
            </div>
            <div
                className={clsx(
                    "relative h-full  w-fullrounded-bl-xl text-white rounded-b-xl p-2 flex gap-2 pt-4",
                    {
                        "bg-neutral-800": theme.en_Name === "Dark",
                        "bg-white border border-gray-200":
                            theme.en_Name === "Primary",
                        "bg-white": theme.en_Name === "Neutral",
                    }
                )}
            >
                <span
                    className={clsx(
                        "border w-[14px] h-[14px] rounded-full  mt-[2px]",
                        {
                            "border-gray-600":
                                theme.en_Name === "Primary" ||
                                theme.en_Name === "Neutral",
                            "border-white": theme.en_Name === "Dark",
                        }
                    )}
                />
                <div className="flex flex-col w-full gap-2">
                    <div
                        className={clsx("w-full h-3  rounded-lg", {
                            "bg-gray-800": theme.en_Name === "Dark",
                            "bg-gray-200": theme.en_Name === "Primary",
                            "bg-gray-300": theme.en_Name === "Neutral",
                        })}
                    ></div>
                    <div className="flex justify-between">
                        <div
                            className={clsx(" w-[75%] h-3 rounded-lg", {
                                "bg-gray-800": theme.en_Name === "Dark",
                                "bg-gray-200": theme.en_Name === "Primary",
                                "bg-gray-300": theme.en_Name === "Neutral",
                            })}
                        ></div>
                        {check && (
                            <span
                                className={clsx({
                                    "text-neutral-800":
                                        theme.en_Name === "Primary" ||
                                        "Neutral",
                                    "text-white": theme.en_Name === "Dark",
                                })}
                            >
                                <CheckIcon className="w-5 h-5" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeCardComponent;

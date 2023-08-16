import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
    DataTransferReducer,
    DueDateReducer,
    ModalReducer,
    PriorityReducer,
    ProjectReducer,
    ProjectSoftDeleteReducer,
    ProjectUpdateReducer,
    SectionReducer,
    TaskTodoHandleComplete,
    TaskTodoReducer,
    TasksRescheduleReducer,
    UserReducer,
} from "./States";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const rootPersistConfig = {
    key: "TodoWebApp",
    storage: storage,
    version: 1,
    whitelist: ["rootUserReducer"],
};

const rootReducer = combineReducers({
    rootUserReducer: UserReducer,
    rootProjectReducer: ProjectReducer,
    rootPriorityReducer: PriorityReducer,
    rootDueDateReducer: DueDateReducer,
    rootSectionReducer: SectionReducer,
    rootProjectSoftDeleteReducer: ProjectSoftDeleteReducer,
    rootDataTransferReducer: DataTransferReducer,
    rootTaskTodoReducer: TaskTodoReducer,
    rootTaskTodoHandleCompleteReducer: TaskTodoHandleComplete,
    rootProjectUpdateReducer: ProjectUpdateReducer,
    rootModalReducer: ModalReducer,
    rootTasksRescheduleReducer: TasksRescheduleReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
        </PersistGate>
    </Provider>
    // </React.StrictMode>
);

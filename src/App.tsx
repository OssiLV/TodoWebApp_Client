import axios from "axios";
import Cookies from "js-cookie";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    redirect,
} from "react-router-dom";
import {
    SignUpPage,
    SignInPage,
    TodayPage,
    ProjectPage,
    UpcomingPage,
} from "./Pages";
import { useEffect } from "react";
function App() {
    const TOKEN = Cookies.get("TOKEN");
    const checkAuth = Boolean(TOKEN);

    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
    axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

    axios.interceptors.response.use(
        (response) => {
            // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
            // Làm gì đó với dữ liệu response

            return response;
        },
        (error) => {
            // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
            // Làm gì đó với lỗi response
            if (error.response.status === 401) {
                //place your reentry code
                window.location.assign("/");
            }

            return Promise.reject(error);
        }
    );

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route
                        path="/app/today"
                        element={checkAuth ? <TodayPage /> : <SignInPage />}
                    />
                    <Route
                        path="/app/project/:projectId"
                        element={checkAuth ? <ProjectPage /> : <SignInPage />}
                    />
                    <Route
                        path="/app/upcomming"
                        element={checkAuth ? <UpcomingPage /> : <SignInPage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

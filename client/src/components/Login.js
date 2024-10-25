import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import dayjs from "dayjs";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [alertType, setAlertType] = useState(null);

    useEffect(() => {
        let interval = setInterval(async () => {
            try {
                if (user?.userId) {
                    const res = await axios.get(
                        `http://localhost:5000/api/notifications/${user.userId}`,
                    );
                    if (res.data.updatedAt !== notification?.updatedAt) {
                        setShowNotification(true);
                        setAlertType("error");
                        setNotificationMessage(
                            `${res.data.fall} on ${dayjs(
                                res.data.updatedAt,
                            ).format("MM/DD/YYYY")} at ${dayjs(
                                res.data.updatedAt,
                            ).format("hh:mm:ss a")}`,
                        );
                        setNotification(res.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }, 2000);
        return () => {
            if (user?.userId) clearInterval(interval);
        };
    }, [user?.userId, notification?.updatedAt]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    username,
                    password,
                },
            );
            setUser(response.data);
            setShowNotification(true);
            setNotificationMessage(response.data.notification); // Handle notification if exists
            setAlertType("success");
            setTimeout(() => {
                setShowNotification(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response
                ? error.response.data.message
                : "Login failed"; // Handle error message
            alert(errorMessage); // Display error message
        }
    };

    const handleClose = () => {
        setShowNotification(false);
    };

    const handleLogOut = () => {
        setUser(null);
        setUsername("");
        setPassword("");
        handleClose();
    };

    return (
        <div style={styles.container}>
            <div className="header">
                <h1>CareConnect</h1>
            </div>
            {showNotification && (
                <Alert
                    variant="filled"
                    severity={alertType}
                    action={
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                    }
                >
                    {notificationMessage}
                </Alert>
            )}
            {!user?.userId && (
                <>
                    <h2 className="login">Login</h2>
                    <form onSubmit={handleLogin} style={styles.form}>
                        <input
                            className="Username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <button
                            type="submit"
                            style={styles.button}
                            className="button"
                        >
                            Login
                        </button>
                    </form>
                    <div style={styles.createAccount}>
                        <a href="/register">Create an account </a>
                    </div>
                </>
            )}
            {user?.userId && (
                <>
                    <h2 className="signed">
                        Bienvenido a CareConnect {user.username}
                    </h2>
                    <Button
                        variant="outlined"
                        onClick={handleLogOut}
                        color="error"
                    >
                        Logout
                    </Button>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
    },
    input: {
        padding: "10px",
        marginBottom: "10px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    createAccount: {
        marginTop: "20px",
        fontSize: "14px",
    },
};

export default Login;

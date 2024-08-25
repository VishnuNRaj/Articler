"use client"

import { useContext } from "react"
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    TextField,
    Button,
    Link,
    Box
} from "@mui/material"
import ColorModeContext from "@/context/ThemeContext"

export default function LoginComponent() {
    const { toggleColorMode } = useContext(ColorModeContext);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                px: 4,
                py: 12,
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    bgcolor: "background.paper",
                    color: "text.primary",
                }}
            >
                <CardHeader
                    title={
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                color: "text.primary",
                            }}
                        >
                            Login
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Enter your email and password to access your account.
                        </Typography>
                    }
                />
                <CardContent>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        InputProps={{
                            style: {
                                backgroundColor: "#2b2b2b",
                                color: "#ffffff",
                            },
                        }}
                        InputLabelProps={{
                            style: { color: "#ffffff" }
                        }}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        InputProps={{
                            style: {
                                backgroundColor: "#2b2b2b",
                                color: "#ffffff",
                            },
                        }}
                        InputLabelProps={{
                            style: { color: "#ffffff" }
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Link
                            href="#"
                            variant="body2"
                            sx={{
                                color: "#3a8aff",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Forgot password?
                        </Link>
                    </Box>
                </CardContent>
                <CardActions sx={{ flexDirection: "column", alignItems: "stretch" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 2,
                        }}
                    >
                        Sign in
                    </Button>
                </CardActions>
                <CardContent sx={{ textAlign: "center", pt: 0 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Don&apos;t have an account?{" "}
                        <Link
                            href="#"
                            sx={{
                                fontWeight: "medium",
                                color: "#3a8aff",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

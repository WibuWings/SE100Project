import React from "react";
import {
    Card,
    CardHeader,
    Divider,
    CardContent,
    Grid,
    TextField,
    Box,
    Button,
} from "@mui/material";
import { GiCancel } from "react-icons/gi";
import { BiPlusMedical, BiEdit } from "react-icons/bi";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
function ModalConfirmPassword(props) {
    const statusDarkmode = useSelector((state) => state.statusDarkmode);
    const infoUser = useSelector((state) => state.infoUser);
    const dispatch = useDispatch();
    const [timeFrom, setTimeFrom] = React.useState(new Date());
    const [timeEnd, settimeEnd] = React.useState(new Date());
    const handleCancel = () => {
        dispatch({
            type: "CHANGE_MODAL_CONFIRM_PASSWORD_STATUS",
        });
    };

    const changeTimeFrom = (newValue) => {
        if (newValue) {
            setTimeFrom(newValue);
        }
    };

    const changetimeEnd = (newValue) => {
        if (newValue) {
            settimeEnd(newValue);
        }
    };

    const exportFile = async () => {
        if (timeEnd - timeFrom >= 0) {
            // Xử lý ở đây
            await axios({
                method: "get",
                url: "http://localhost:5000/api/report",
                params: {
                    token: localStorage.getItem("token"),
                    from: timeFrom,
                    end: timeEnd,
                    storeID: infoUser.email
                },
                responseType: "blob",
            }).then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Report.xlsx"); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
            //
            dispatch({
                type: "SHOW_ALERT",
                message: "Export success",
                typeMessage: "success",
            });
            handleCancel();
        } else {
            dispatch({
                type: "SHOW_ALERT",
                message:
                    "The end date must be greater than greater than or equal to the start date",
                typeMessage: "warning",
            });
        }
    };

    return (
        <Card
            className="card-confirm-password"
            style={{
                minWidth: "500px",
                width: "600px",
                justifyContent: "center",
                marginTop: "10%",
            }}
        >
            <CardHeader
                style={{
                    color: !statusDarkmode ? "#0091ea" : "white",
                    backgroundColor: !statusDarkmode ? "#efeeef" : "#455a64",
                }}
                title="Export file sales report"
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="From"
                                    value={timeFrom}
                                    minDate={new Date("2017-01-01")}
                                    onChange={(newValue) =>
                                        changeTimeFrom(newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                                <DesktopDatePicker
                                    label="To"
                                    value={timeEnd}
                                    minDate={new Date("2017-01-01")}
                                    onChange={(newValue) =>
                                        changetimeEnd(newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 2 }}>
                <Button
                    onClick={() => exportFile()}
                    style={{ backgroundColor: "yellowgreen" }}
                    variant="contained"
                    startIcon={<BiPlusMedical />}
                >
                    Confirm
                </Button>
                <Button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleCancel()}
                    variant="contained"
                    startIcon={<GiCancel />}
                >
                    Cancel
                </Button>
            </Box>
        </Card>
    );
}

export default ModalConfirmPassword;

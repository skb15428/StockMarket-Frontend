import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertComp = ({ type, message, setAlert }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity={type}
        onClose={() => setAlert({ type: "", message: "" })}
      >
        {message}
      </Alert>
    </Stack>
  );
};

export default AlertComp;

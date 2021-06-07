/* The entrypoint for starting the server */

import app from "./app";

const host = "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, error => {
    if (error) {
        console.log("Unable to start server", error); // eslint-disable-line no-console
        process.exit(1);
    }

    console.log(`App available on http://${host}:${port}`); // eslint-disable-line no-console
});

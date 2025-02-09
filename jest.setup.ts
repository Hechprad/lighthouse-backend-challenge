import { IncomingMessage, Server, ServerResponse } from "http";

import { app } from "./src";

export let testServer: Server<typeof IncomingMessage, typeof ServerResponse>;

module.exports = () => {
  const port = process.env.PORT || 0;
  testServer = app.listen(port, () =>
    console.log("Global test server started.")
  );
};

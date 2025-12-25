import express from "express";

const server = express();

server.listen(2020, (err) => {
  //   if (err) {
  //     throw new Error(err.message + "test");
  //   }
  console.log("server is running");
});

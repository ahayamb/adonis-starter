export default {
  path: __dirname + "../",
  title: "Foo",
  version: "1.0.0",
  tagIndex: 1,
  snakeCase: true,
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUT", // if PUT/PATCH are provided for the same rout, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI confomr headers that are commonly used
  },
};

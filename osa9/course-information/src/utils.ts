export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimated union member: ${JSON.stringify(value)}`
  );
};
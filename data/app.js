export const apiBaseURL = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://385-i-cu-giving.pantheonsite.io/";
};

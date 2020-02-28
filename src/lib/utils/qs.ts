export default (url: any, params: any) => {
  const qs = Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return `${url}?${qs}`;
};

// Code from https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(urlRegex, url => '<a href="' + url + '">' + url + "</a>");
}

export default linkify;

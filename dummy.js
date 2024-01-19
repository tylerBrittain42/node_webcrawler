function html1() {
  return `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
}
function link1() {
  return ["https://blog.boot.dev/"];
}
function html2() {
  return `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
}
function link2() {
  return ["https://blog.boot.dev/", "https://blog.boot.dev/"];
}

function html3() {
  return `<html>
    <body>
        <a href="/news/bootdev-beat-2024-01/"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
}
function link3() {
  return ["https://blog.boot.dev/news/bootdev-beat-2024-01/"];
}
module.exports = {
  html1,
  link1,
  html2,
  link2,
  html3,
  link3,
};

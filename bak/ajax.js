// 浏览器端请求
function ajaxBrowser({
  method = 'GET',
  url = '',
  timeout = 30000
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const responseText = xhr.responseText;
          try {
            const res = JSON.parse(responseText);
            resolve(res);
          } catch (e) {
            reject({
              message: '数据异常'
            });
          }
        } else {
          reject({
            message: '网络请求错误',
          });
        }
      }
    };
    xhr.ontimeout = () => {
      reject({
        message: '请求超时'
      });
    };
    xhr.send();
  });
}

// node环境请求
const ajaxNode = function ({
  url = '',
  method = 'GET',
  timeout = 30000
}) {
  return new Promise((resolve, reject) => {
    let isTimeout = false; // 标识超时

    const https = require('https');
    const req = https.request(url, {
      method,
      timeout
    });
    req.setTimeout(timeout, () => {
      req.abort();
      isTimeout = true;
      reject({
        message: '请求超时'
      });
    });

    req.on('response', (res) => {
      if (res.statusCode == 200) {
        var chunk = "";
        res.on('data', function (d) {
          chunk += d;
        });
        res.on('end', function () {
          if (isTimeout) { return; }

          try {
            const data = JSON.parse(chunk);
            resolve(data);
          } catch (e) {
            reject({
              message: '数据异常'
            });
          }
        });
      } else {
        reject({
          message: '网络请求错误'
        });
      }
    });
    req.on('error', function (e) {
      if (isTimeout) { return; }
      reject({
        message: '网络请求错误'
      });
    });
  });
}

const ajax = typeof window !== 'undefined' ? ajaxBrowser : ajaxNode;

export default ajax;

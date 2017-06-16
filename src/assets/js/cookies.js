/* \
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\ */
/*
写入cookie

语法
docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
描述
创建或覆盖一个cookie

参数
name (必要)
要创建或覆盖的cookie的名字 (string)。
value (必要)
cookie的值 (string)。
end (可选)
最大年龄的秒数 (一年为31536e3， 永不过期的cookie为Infinity) ，或者过期时间的GMTString格式或Date对象; 如果没有定义则会在会话结束时过期 (number – 有限的或 Infinity – string, Date object or null)。
path (可选)
例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。(string or null)。路径必须为绝对路径（参见 RFC 2965）。关于如何在这个参数使用相对路径的方法请参见这段。
domain (可选)
例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (string或null)。
secure (可选)
cookie只会被https传输 (boolean或null)。
得到cookie

语法
docCookies.getItem(name)
描述
读取一个cookie。如果cookie不存在返回null。

参数
name
读取的cookie名 (string).
移除cookie

Syntax
docCookies.removeItem(name[, path],domain)
描述
删除一个cookie。

参数
name
要移除的cookie名(string).
path (可选)
例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。(string or null)。路径必须为绝对路径（参见 RFC 2965）。关于如何在这个参数使用相对路径的方法请参见这段。
domain (可选)
例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (string或null)。
检测cookie

语法
docCookies.hasItem(name)
描述
检查一个cookie是否存在

参数
name
要检查的cookie名 (string).
得到所有cookie的列表

语法
docCookies.keys()
描述
返回一个这个路径所有可读的cookie的数组。
*/

export default {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    var sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
    return true
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
    return true
  },
  hasItem: function (sKey) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}

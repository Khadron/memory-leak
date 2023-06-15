'use strict';
//引入模块
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
// const mime = require('mime');//用于处理文件的Content-Type，通过npm安装


//创建并导出StaticServer类
class StaticServer {
    //构造函数
    //初始化自动调用
    constructor(options) {
        this.currentServer = null;      //http对象
        this.options = {
            port: 3002,                 //服务器动的端口
            host: '127.0.0.1',          //服务器启动的ip
            filePath: './www',       //静态文件根目录
            homePage: '/index.html'     //指定首页文件
        };
        //把传入构造函数的参数中的值加入到options中
        for (let key in options) {
            this.options[key] = options[key];
        }
    }
    //服务器启动函数
    run() {
        let self = this;
        this.currentServer = http.createServer((req, res) => {
            let tmpUrl = url.parse(req.url).pathname;//解析客户端请求访问的url地址
            let reqUrl = tmpUrl === '/' ? self.options.homePage : tmpUrl //如果用户访问的是'/'首页，则自动指定读取首页文件，默认是'index.html'
            let filePath = path.resolve(__dirname,self.options.filePath) + reqUrl;//组装文件地址
            if (!path.extname(filePath)) {
                filePath += '/index.html'
            }
            console.log('request: ', req.url, path.resolve(filePath))

            //检测文件是否存在
            self.checkFilePromise(filePath).then(() => {
                console.log('>1 read file:', filePath)
                return self.readFilePromise(filePath);// 文件存在则尝试读取文件
            }).then((data) => {
                console.log('>2 send data:', filePath)
                const key = path.extname(filePath).replace(/\./, '')
                const ct = mime[key] || 'text/plain'
                self.sendData(res, data, ct);//读取成功发送数据
            }).catch(() => {
                self.catch404(res);//读取失败
            });
        }).listen(this.options.port, this.options.host, () => {
            console.log('Server is running on ' + this.options.host + ':' + this.options.port);
        });
    }
    //关闭服务
    close() {
        this.currentServer.close(() => {
            console.log('Server closed.');
        });
    }
    //发送文件内容
    sendData(res, data, ct) {
        try {
            res.writeHead(200, { 'Content-Type': ct });
            res.write(data);
            res.end();
        } catch (e) {
            console.error('error: ', e)
        }
    }
    //捕获404错误
    catch404(res) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Error 404. Resource not found.');
        res.end();
    }
    //使用promise包读取文件的方法
    readFilePromise(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    // 使用 promise 包装见文件是否可读取的方法
    // fs.access 用于检测文件是否可读取
    checkFilePromise(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.R_OK, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('success');
                }
            });
        });
    }
}

const mime = {

    'hqx': 'application/mac-binhex40',

    'cpt': 'application/mac-compactpro',

    'csv': ['text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel'],

    'bin': 'application/macbinary',

    'dms': 'application/octet-stream',

    'lha': 'application/octet-stream',

    'lzh': 'application/octet-stream',

    'exe': ['application/octet-stream', 'application/x-msdownload'],

    'class': 'application/octet-stream',

    'psd': 'application/x-photoshop',

    'so': 'application/octet-stream',

    'sea': 'application/octet-stream',

    'dll': 'application/octet-stream',

    'oda': 'application/oda',

    'pdf': ['application/pdf', 'application/x-download'],

    'ai': 'application/postscript',

    'eps': 'application/postscript',

    'ps': 'application/postscript',

    'smi': 'application/smil',

    'smil': 'application/smil',

    'mif': 'application/vnd.mif',

    'xls': ['application/excel', 'application/vnd.ms-excel', 'application/msexcel'],

    'ppt': ['application/powerpoint', 'application/vnd.ms-powerpoint'],

    'wbxml': 'application/wbxml',

    'wmlc': 'application/wmlc',

    'dcr': 'application/x-director',

    'dir': 'application/x-director',

    'dxr': 'application/x-director',

    'dvi': 'application/x-dvi',

    'gtar': 'application/x-gtar',

    'gz': 'application/x-gzip',

    'php': 'application/x-httpd-php',

    'php4': 'application/x-httpd-php',

    'php3': 'application/x-httpd-php',

    'phtml': 'application/x-httpd-php',

    'phps': 'application/x-httpd-php-source',

    'js': 'application/x-javascript',

    'swf': 'application/x-shockwave-flash',

    'sit': 'application/x-stuffit',

    'tar': 'application/x-tar',

    'tgz': ['application/x-tar', 'application/x-gzip-compressed'],

    'xhtml': 'application/xhtml+xml',

    'xht': 'application/xhtml+xml',

    'zip': ['application/x-zip', 'application/zip', 'application/x-zip-compressed'],

    'mid': 'audio/midi',

    'midi': 'audio/midi',

    'mpga': 'audio/mpeg',

    'mp2': 'audio/mpeg',

    'mp3': ['audio/mpeg', 'audio/mpg', 'audio/mpeg3', 'audio/mp3'],

    'aif': 'audio/x-aiff',

    'aiff': 'audio/x-aiff',

    'aifc': 'audio/x-aiff',

    'ram': 'audio/x-pn-realaudio',

    'rm': 'audio/x-pn-realaudio',

    'rpm': 'audio/x-pn-realaudio-plugin',

    'ra': 'audio/x-realaudio',

    'rv': 'video/vnd.rn-realvideo',

    'wav': ['audio/x-wav', 'audio/wave', 'audio/wav'],

    'bmp': ['image/bmp', 'image/x-windows-bmp'],

    'gif': 'image/gif',

    'jpeg': ['image/jpeg', 'image/pjpeg'],

    'jpg': ['image/jpeg', 'image/pjpeg'],

    'jpe': ['image/jpeg', 'image/pjpeg'],

    'png': ['image/png', 'image/x-png'],

    'tiff': 'image/tiff',

    'tif': 'image/tiff',

    'css': 'text/css',

    'html': 'text/html',

    'htm': 'text/html',

    'shtml': 'text/html',

    'txt': 'text/plain',

    'text': 'text/plain',

    'log': ['text/plain', 'text/x-log'],

    'rtx': 'text/richtext',

    'rtf': 'text/rtf',

    'xml': 'text/xml',

    'xsl': 'text/xml',

    'mpeg': 'video/mpeg',

    'mpg': 'video/mpeg',

    'mpe': 'video/mpeg',

    'qt': 'video/quicktime',

    'mov': 'video/quicktime',

    'avi': 'video/x-msvideo',

    'movie': 'video/x-sgi-movie',

    'doc': 'application/msword',

    'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'],

    'xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'],

    'word': ['application/msword', 'application/octet-stream'],

    'xl': 'application/excel',

    'eml': 'message/rfc822',

    'json': ['application/json', 'text/json']

};


//创建对象
let server = new StaticServer();
//启动服务
server.run();
//停止服务
// server.close();
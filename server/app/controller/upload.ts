import { Controller } from "egg";
// 图片上传服务器
// 1. 前端调用上传接口，并将图片参数带上
// 2. 在服务端接口前端传进来的图片信息，信息中含有图片路径信息，我们在服务端通过`fs.readFileSync`方法，来读取图片内容，并存放在变量中
// 3. 找个存放图片的公共位置，一版情况下，都会存放至 `app/public/upload`,
// 4. 通过 `fs.writeFileSync` 方法将图片内容写入第3步新建的文件夹中
// 5. 最后返回图片地址，基本上图片地址结构是：`host + ip + 图片名称 + 后缀`
import * as fs from "fs";
import * as moment from "moment";
import mkdirp from "mkdirp";
import * as path from "path";

export default class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    // 需要在配置中设置mode为file
    const file = ctx.request.files[0];
    // 声明存放资源的路径
    let uploadDir = '';
    try {
      const f = fs.readFileSync(file.filepath);
      // 获取当前日期
      const day = moment(new Date()).format('YYYYMMDD');
      // 创建图片保存的路径
      const dir = path.join(this.config.uploadDir, day);
      const date = Date.now(); // 毫秒数
      // 不存在就创建目录
      await mkdirp(dir);
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 写入文件夹
      fs.writeFileSync(uploadDir, f);


    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, '')
    }
  }
}
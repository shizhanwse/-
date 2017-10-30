/**
 * Created by Gaven on 2017/8/1.
 */

//获取令牌
export const getToken = '/login/token';



//订单
export const createOrder = '/api/order/create';
export const getOrderList = '/api/order/list';
export const orderPrint = '/api/order/print';



//查询项目列表
export const getProjectList = '/api/serviceProgram/list';
//查询项目详情
export const getProjectDetail = '/api/serviceProgram/get';



//查询部门
export const getDepartmentList = '/api/department/list';



//查询报表预览图片
export const getPreview = '/api/serviceProgram/view';
export const previewSrc = '/api/serviceProgram/download?fileName=';




//查询终端
export const getTerminalDetail = '/api/terminal/get';
export const getTerminal = '/api/terminal/list';
export const terminalCheck = '/api/terminal/check';




//支付相关接口
export const chargeRule = '/api/pay/chargeRule';
export const fee = '/api/pay/fee';




//微信js-sdk
export const jsApiConfig = '/api/wechat/jsApiConfig';

//新需求
export const sysConfigList = '/api/sysConfigInfo/list';
export const orderConfirm = '/api/order/confirm';


//终端部分
//终端列表
export const statusList = '/api/command/statusList';
//获取终端状态
export const statusGet = '/api/command/statusGet';
//发送开始远程控制的命令
export const opentv = '/api/command/opentv';
//发送关机命令
export const shutdown = '/api/command/shutdown';
//发送重启命令
export const reboot = '/api/command/reboot';
//获取终端文件路径
export const pathurl = '/api/command/pathurl';
//发送检索终端文件命令
export const searchfile = '/api/command/searchfile';
//发送设置终端定时开关机时间命令
export const settime = '/api/command/settime';
//发送获取终端定时开关机时间命令
export const gettime = '/api/command/gettime';
//下载服务端本地文件
export const downloadfile = '/api/command/downloadfile';
//发送下载终端文件命令
export const backupfile = '/api/command/backupfile';


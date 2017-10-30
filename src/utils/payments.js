/**
 * Created by Gaven on 2017/8/8.
 */

export const weixinPay = ({appId, timeStamp, nonceStr, ppackage, signType, paySign})=>{
  return new Promise((resolve, reject)=>{
    if(window.WeixinJSBridge){
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId,
          timeStamp,
          nonceStr,
          'package': ppackage,
          signType,
          paySign
        },
        function(res){
          if(res.err_msg == 'get_brand_wcpay_request:ok'){
            resolve(true)
          }else{
            console.log('微信支付失败：'+res.err_msg);
            resolve(false)
          }
        }
      );
    }else{
      console.log('调用微信支付模块失败！');
      resolve(false)
    }
  });
};

export const zhifubaoPay = ()=>{

};

export const wangyinPay = ()=>{

};

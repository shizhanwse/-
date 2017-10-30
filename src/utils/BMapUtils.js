/**
 * Created by Gaven on 2017/9/1.
 */
import BMap from 'BMap'

export const getLocationPoint = ()=>{
  return new Promise((resolve, reject)=>{
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        console.log(r.point);
        resolve(new BMap.Point(r.point.lng, r.point.lat))
      }
      else {
        console.log('failed'+this.getStatus());
        reject();
      }
    },{enableHighAccuracy: true})
  })
};

export const parseDistance = (distance)=>{
  if(distance){
    if(distance<1000){
      return distance + '米';
    }else{
      return (distance/1000).toFixed(1) + '千米';
    }
  }else{
    return '计算中...'
  }
};

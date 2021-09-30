import  {request} from "@/network/request";

export function getInfo(){
    return request({
        url:'/common/getCertByInfo',
        method:'post',
        data:{},
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

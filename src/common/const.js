// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
import "@/network/mycloud-sdk"
// import "@/network/nlecloud-sdk"
// eslint-disable-next-line no-undef
export const sdkContest = new NLECloudAPI();

export const dataTitle=[
    {title: '时间',name:'date'},
    {title: '上限温度',name:'temp_up'},
    {title: '下限温度',name:'temp_low'},
    {title: '当前温度',name:'temp_cur'},
    {title: '温度警报',name:'temp_alarm'},
    {title: '空调开关',name:'air_switch'},
    {title: '上限温度控制',name:'temp_up_ctrl'},
    {title: '下限温度控制',name:'temp_low_ctrl'},
    {title: '空调开关',name:'air_switch_ctrl'},
]

export const searchTitle=[
    {title: '传感器名称',name:'ApiTag'},
    {title: '记录时间',name:'RecordTime'},
    {title: '值',name:'Value'},
]

export const ExelTitle={
    '传感器名称':'ApiTag',
    '记录时间':'RecordTime',
    '值':'Value',
}

export const user={
    id:'18573242037',
    password:'tozuki160308',
    devIds:'322860',
    // projectId:'291210'
}
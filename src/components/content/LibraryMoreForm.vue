<template>
  <div class="form">
    <el-form ref="form"
             :model="form"
             label-width="120px"
             label-position="left"
             v-loading="loading"
             element-loading-text="搜索中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             :rules="rules">

      <el-form-item label="设备ID(必填)" prop="DeviceId" >
        <el-input v-model="form.DeviceId"></el-input>
      </el-form-item>

      <el-form-item label="读者id(选填)">
        <el-input v-model="form.reader"></el-input>
      </el-form-item>

      <el-form-item label="图书编号(选填)">
        <el-input v-model="form.book"></el-input>
      </el-form-item>


      <el-form-item label="起始时间" prop="StartDate">
        <el-col :span="11">
          <el-date-picker
              type="datetime"
              value-format=" yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              v-model="form.StartDate"
              style="width: 100%;"></el-date-picker>
        </el-col>

      </el-form-item>

      <el-form-item label="结束时间" prop="EndDate">
        <el-col :span="11">
          <el-date-picker
              type="datetime"
              value-format=" yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              v-model="form.EndDate"
              style="width: 100%;"></el-date-picker>
        </el-col>

      </el-form-item>


      <el-form-item label="数据条数(选填)">
        <el-input v-model="form.PageSize"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {sdkContest} from "@/common/const";
export default {
  name: "LibraryMoreForm",
  data() {
    return {
      list2:[],//搜索数据图表的内容
      loading:false,
      form: {
        DeviceId:'322860',
        StartDate: '',
        EndDate: '',
        PageSize:20,
        reader:'',
        book:''
      },
      rules: {
        DeviceId: [
          { required: true, message: '请输入设备ID', trigger: 'blur' }
        ],
        Method: [
          { required: true, message: '请选择查询方式', trigger: 'change' }
        ],
        StartDate: [
          {  required: true, message: '请选择起始时间', trigger: 'change' }
        ],
        EndDate: [
          {  required: true, message: '请选择结束时间', trigger: 'change' }
        ],

      }
    }
  },
  methods: {
    onSubmit() {

      let isOK=true
      this.$refs.form.validate((valid) => { // 提交前先验证表单
        if (!valid) {
          isOK=false
          return
        }
      });
      if (!isOK)
        return
      this.loading=true
      let realForm={
            DeviceId:'322860',
            ApiTags: 'book_borrow,book_return',
            StartDate: '',
            EndDate: '',
            Method:6,
            TimeAgo:-1,
            PageIndex:1,
            PageSize:20,
          };
      realForm['StartDate']=(this.form.StartDate+':00').trim()
      realForm['EndDate']=(this.form.EndDate+':00').trim()
      realForm['DeviceId']=this.form.DeviceId
      realForm['PageSize']=this.form.PageSize
      // console.log(realForm)
      let that=this
      // 提交表单查询
      sdkContest.getSensorData(realForm).completed(function(res){
        that.loading=false
        if(res.Status){
          that.$message.error('查询失败');
          console.log(res)
          return
        }
        if(res.ResultObj.Count===0){
          that.$message({
            message: '当前查询范围内，没有数据',
            type: 'warning'
          });
          return;
        }
        let list=[]
        list=res.ResultObj.DataPoints
        // 处理返回结果，获取折线图所需数据
        that.getChartData(list,realForm.StartDate,realForm.EndDate)
        let returnlist=[]
        // 处理返回结果，获取表格所需数据
        for (let i=0;i<list.length;i++){
          for(let j=0;j<list[i].PointDTO.length;j++){
            let item={}
            if(list[i].ApiTag==='book_borrow') {
              item['action'] = '借书'
            }
            else{
              item['action'] = '还书'
            }
            let info=list[i].PointDTO[j].Value.split(',')
            item['bookId']=info[0]
            item['readerId']=info[1]
            item['RecordTime']=list[i].PointDTO[j].RecordTime
            // console.log(item)
            returnlist.push(item)
          }
        }
        // 对获取的数据根据用户输入的读者和图书编号进行过滤
        if(that.form.reader!==''){
          returnlist=returnlist.filter(item=>item['readerId']===that.form.reader)
        }
        if(that.form.book!==''){
          returnlist=returnlist.filter(item=>item['bookId']===that.form.book)
        }
        // console.log(returnlist)
        // 返回结果
        that.$emit('showSearchData',returnlist);
      })
      console.log('submit!');
    },
    /*
    处理返回的数据，并将结果传到父组件
    list：api返回结果
    start：用户输入的起始时间
    end：用户输入的结束时间
    1.对结果进行遍历，求出时间段内每天进行还书、借书动作的次数
    2.返回结果
     */
    getChartData(list,start,end){
      // 获取时间段内的每一天
      let result1=this.formatEveryDay(start,end)
      console.log(list)
      for (let i=0;i<list[0].PointDTO.length;i++){
        for (let j=0;j<result1.length;j++){
          if (list[0].PointDTO[i].RecordTime.indexOf(result1[j].time)!==-1){
            console.log(list[0].PointDTO[i].RecordTime,result1[j].time)
            result1[j].count++
          }
        }
      }
      let return1={'name':list[0].ApiTag,'list':result1}
      let result2=this.formatEveryDay(start,end)
      for (let i=0;i<list[1].PointDTO.length;i++){
        for (let j=0;j<result2.length;j++){
          if (list[1].PointDTO[i].RecordTime.indexOf(result2[j].time)!==-1){
            result2[j].count++
          }
        }
      }
      let return2={'name':list[1].ApiTag,'list':result2}
      this.$emit('returnChartDat',[return1,return2])
    },
    /*
    获取一定时间段内的每一天
    start：开始时间
    end：结束时间
     */
    formatEveryDay(start, end) {
      let dateList = [];
      var startTime = new Date(start);
      var endTime =new Date(end);

      while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
        var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        dateList.push(new Object({'time':year + "-" + month + "-" + day,'count':0}));
        startTime.setDate(startTime.getDate() + 1);
      }
      return dateList;
    },
  },


}


</script>

<style scoped>
/deep/.el-input{
  width: auto;
}
</style>
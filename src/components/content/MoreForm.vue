<template>
  <div class="more-form">
    <el-form ref="form"
             :model="form"
             label-width="120px"
             label-position="left"
             v-loading="loading"
             element-loading-text="搜索中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             :rules="rules">

      <el-form-item label="设备ID(必填)" prop="DeviceId">
        <el-input v-model="form.DeviceId"></el-input>
      </el-form-item>

      <el-form-item label="传感标识名(选填)">
        <el-input v-model="form.ApiTags"></el-input>
      </el-form-item>

      <el-form-item label="查询方式" prop="Method">
        <el-select v-model="form.Method" placeholder="请选择查询方式">
          <el-option label="XX分钟内" value="1"></el-option>
          <el-option label="XX小时内" value="2"></el-option>
          <el-option label="XX天内" value="3"></el-option>
          <el-option label="XX周内" value="4"></el-option>
          <el-option label="XX月内" value="5"></el-option>
          <el-option label="按startDate与endDate指定日期查询[默认]" value="6"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
          label="时间跨度"
          v-show="form.Method==='1'||form.Method==='2'||form.Method==='3'||form.Method=='4'||form.Method=='5'">
        <el-input v-model="form.TimeAgo"></el-input>
      </el-form-item>

      <el-form-item label="起始时间" prop="StartDate"
                    v-show="form.Method===''||form.Method==='6'">
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

      <el-form-item label="结束时间" prop="EndDate"
                    v-show="form.Method===''||form.Method==='6'">
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

      <el-form-item label="排序方式(选填)">
        <el-select v-model="form.Sort" placeholder="请选择排序方式">
          <el-option label="倒序" value="DESC"></el-option>
          <el-option label="升序" value="ASC"></el-option>
        </el-select>
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
  name: "MoreForm",
  data() {
    return {
      loading:false,
      form: {
        DeviceId:'322860',
        ApiTags: '',
        Method: '',
        StartDate: '',
        EndDate: '',
        Sort:'',
        PageSize:20,
        TimeAgo:''
      },
      rules: {
        DeviceId: [
          { required: true, message: '请输入设备ID', trigger: 'blur' }
        ],
        Method: [
          { required: true, message: '请选择查询方式', trigger: 'change' }
        ],
        // StartDate: [
        //   {  required: true, message: '请选择起始时间', trigger: 'change' }
        // ],
        // EndDate: [
        //   {  required: true, message: '请选择结束时间', trigger: 'change' }
        // ],
      }
    }
  },
  methods: {
    onSubmit() {
      let that=this
      this.loading=true
      let submitform=this.form;
      submitform['StartDate']=(this.form.StartDate+':00').trim()
      submitform['EndDate']=(this.form.EndDate+':00').trim()
      sdkContest.getSensorData(submitform).completed(function(res){
        that.loading=false
        if(res.Status){
          // console.log(res)
          that.$message.error('查询失败');
          return
        }
        if(res.ResultObj.Count===0){
          that.$message({
            message: '当前查询范围内，没有数据',
            type: 'warning'
          });
          return;
        }
        // console.log(res);
        let list=[]
        list=res.ResultObj.DataPoints
        // console.log(list)
        that.$emit('showSearchData',list);
      })
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
/deep/.el-input{
  width: auto;
}
</style>
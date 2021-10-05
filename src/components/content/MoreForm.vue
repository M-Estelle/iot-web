<template>
  <div class="more-form">
    <el-form ref="form" :model="form" label-width="120px" label-position="left">

      <el-form-item label="设备ID(必填)">
        <el-input v-model="form.DeviceId"></el-input>
      </el-form-item>

      <el-form-item label="传感标识名(选填)">
        <el-input v-model="form.ApiTags"></el-input>
      </el-form-item>

      <el-form-item label="查询方式">
        <el-select v-model="form.Method" placeholder="请选择查询方式">
          <el-option label="XX分钟内" value="1"></el-option>
          <el-option label="XX小时内" value="2"></el-option>
          <el-option label="XX天内" value="3"></el-option>
          <el-option label="XX周内" value="4"></el-option>
          <el-option label="XX月内" value="5"></el-option>
          <el-option label="按startDate与endDate指定日期查询[默认]" value="6"></el-option>
        </el-select>
        请输入时间跨度:
        <el-input v-model="form.TimeAgo"></el-input>
      </el-form-item>

      <el-form-item label="起始时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="排序方式">
        <el-select v-model="form.Sort" placeholder="请选择排序方式">
          <el-option label="倒序" value="DESC"></el-option>
          <el-option label="升序" value="ASC"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="数据条数">
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
      form: {
        DeviceId:'322860',
        ApiTags: '',
        Method: '',
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        Sort:'',
        PageSize:20,
        TimeAgo:''
      }
    }
  },
  methods: {
    onSubmit() {
      let that=this
      sdkContest.getSensorData(this.form).completed(function(res){
        let list=res.ResultObj.DataPoints
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
<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'名称'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'日期'" prop="createTime">
            <div class="block" >
              <el-date-picker
                v-model="search.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">投放</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------
import { mapGetters } from "vuex";
import { addPlanProductTask } from "@/api/process/index";
export default {
  data() {
    return {
      search: {
        keyword: null,
        startDate: null,
      },
      getTime: function() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        _this.search.startDate = yy + '-' + mm + '-' + dd
      },
      flag: true,
      plaIdS: null,
      plaArray: [],
    };
  },
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  mounted() {
    this.getTime()
  },
  methods: {
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.startDate != null || this.search.startDate != undefined ? obj.startDate = this.search.startDate : null
      return obj
    },
    handleAdd(){
      if (this.selections.length>0) {
          let selections = this.selections
       /* selections.forEach((item, index) =>{
          console.log(item)
        })*/
        addPlanProductTask(this.selections).then(res => {
          this.$emit('uploadList')
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    // 关键字查询
    query(){
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.startDate = null
      this.$emit('uploadList')
    }
  }
};
</script>

<style>
</style>

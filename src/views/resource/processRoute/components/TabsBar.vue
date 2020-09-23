<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-form-item :label="'物料编码'">
            <el-input v-model="search.number" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'物料名称'">
            <el-input v-model="search.name" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'工序'">
            <el-input v-model="search.processName" placeholder=""/>
          </el-form-item>
        </el-col>、
        <el-col :span="4">
          <el-form-item :label="'图号'">
            <el-input v-model="search.chartNumber" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-button-group style="float:right" >
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.color == 'normal'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.name}}</el-button>
        <!--  <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="alter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-news" @click="handleCopy">复制</el-button>-->
          <el-upload
            name="processRoute"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            v-for="(t,i) in btnList" :key="i"
            v-if="t.color == 'export'"
            accept="xlsx,xls"
            ref="upload"
            :headers="headers"
            :show-file-list="false"
            action="process/excel/import/processRoute"
            class="upload-demo"
            multiple
            :auto-upload="false"
            :on-change="handleUpload"
            :limit="1"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2" >导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-up" @click="audit">审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-down" @click="unAudit">反审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>-->
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import {getToken} from '@/utils/auth'
  import {getProcessMenuByParent} from "@/api/wy/menu"
  import { processAgainstAudit, processAudit} from "@/api/basic/index"
  export default {
    components: {},
    computed: {
      ...mapGetters(["node","clickData","selections"])
    },
    data() {
      return {
        headers: {
          'authorization': getToken('apsrx'),
        },
        isUpload: null,
        btnList: [],
        search: {
          name: null,
          processName: null,
          chartNumber: null,
          number: null
        }
      };
    },
    mounted() {
      let path = this.$route.meta.id
      getProcessMenuByParent(path).then(res => {
        this.btnList = res.data
        this.$forceUpdate();
      });
    },
    methods: {
      onFun(method){
        this[method]()
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      uploadError(res) {
        this.$message({
          message: '上传失败',
          type: "warning"
        });
        this.$emit('uploadList')
      },
      uploadSuccess(res) {
        if(res.success){
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$emit('uploadList')
        }else{
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      },
      handleUpload(file, fileList){
        if(file.status=="ready"){
          this.submitUpload()
        }
      },
      Delivery() {
        if (this.clickData.processRouteId) {
          this.$confirm('是否删除（' + this.clickData.name + '），删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delList', {
              processRouteId: this.clickData.processRouteId
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      alter() {
        if (this.clickData.processRouteId) {
          this.$emit('showDialog', this.clickData)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      audit() {
        if (this.clickData.processRouteId) {
          processAudit(this.clickData.processRouteId).then(res => {
            this.$emit('uploadList')
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      unAudit() {
        if (this.clickData.processRouteId) {
          processAgainstAudit(this.clickData.processRouteId).then(res => {
            this.$emit('uploadList')
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      handleCopy() {
        if (this.selections.length) {
          this.$message({
            message: "复制成功",
            type: "success"
          })
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      query() {
        console.log(this.qFilter())
        this.$emit('queryBtn', this.qFilter())
      },
      upload() {

        this.search.name = ''
        this.search.number = ''
        this.search.processName = ''
        this.search.chartNumber = ''
        this.$emit('uploadList')
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        console.log( this.search)
        this.search.name != null && this.search.name != '' ? obj.name = this.search.name : null
        this.search.number != null && this.search.number != '' ? obj.number = this.search.number : null
        this.search.chartNumber != null && this.search.chartNumber != '' ? obj.chartNumber = this.search.chartNumber : null
        this.search.processName != null && this.search.processName != '' ? obj.processName = this.search.processName : null
        return obj
      },
      handleAdd(){
        this.$emit('showDialog')
      }
    }
  };
</script>

<style>
  .upload-demo{
    float: right;
  }
</style>

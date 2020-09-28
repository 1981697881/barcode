<template>
  <div>
    <el-form :model="form1" :rules="rules" ref="form1" :label-width="'90px'" :size="'mini'">
      <el-row :gutter="20">
        <!--<el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'任务单号'" >
              <el-input v-model="form1.workNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'卡号'" >
              <el-input v-model="form1.processCard" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'金蝶号'" >
              <el-input v-model="form1.kingDeeNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'生产批次号'" >
              <el-input v-model="form1.lotNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'产品编码'" >
              <el-input v-model="form1.productNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'" >
              <el-input v-model="form1.productName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'规格型号'" >
              <el-input v-model="form1.model" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'人员'" >
              <el-input v-model="form1.dispatchName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'计划量'" >
              <el-input v-model="form1.planNum" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'派工数量'" >
              <el-input v-model="form1.dispatchNum" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'工序'" >
              <el-input v-model="form1.processName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>-->
        <el-col :span="24">
          <el-table el-table :height="'calc(100vh/1.5)'" :data="list" border size="mini" :highlight-current-row="true">
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:'150px'"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input-number size="mini" v-if="t.name == 'productNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <el-input-number size="mini" v-if="t.name == 'qualifiedNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                </span>
                <span v-else>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.row,scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
                <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
       <!-- <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>-->
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from "vuex";
  import { getEmpList, teamList } from "@/api/basic/index";
  import { addProductWorkReport} from "@/api/process/index";
  import List from "@/components/List"
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["selections"])
    },
    props: {
      listInfo: {
        type: Array,
        default: null
      },
    },
    data() {
      return {
        loading: false,
        sel: null, // 选中行
       form1: {
         /* processPlanNum: null,
         productWorkPlanNum: null,
         processName: null,
         kingDeeNo: null,
         productName: null,
         productNumber: null,
         processTeamName: null,
         dispatchNum: null,
         workDate: null,
         processTeamId: null,
         model: null,
         lotNo: null,
         projectName: null,
         workNo: null,*/
       },
        visible: null,
        list: [],
        columns: [
          { text: "任务单号", name: "workNo" },
          { text: "生产班组", name: "processTeamName" },
          { text: "开工日期", name: "workDate" },
          { text: "生产者", name: "dispatchName" },
          { text: "卡号", name: "processCard" },
          { text: "金蝶号", name: "kingDeeNo" },
          { text: "生产批次号", name: "lotNo" },
          { text: "产品编码", name: "productNumber" },
          { text: "工程名称", name: "projectName" },
          { text: "产品名称", name: "productName" },
          { text: "规格型号", name: "model" },
          { text: "工序名称", name: "processName" },
          { text: "订单量", name: "orderNum" },
          { text: "剩余量", name: "residueNum" },
          { text: "计划量", name: "planNum" },
          { text: "工序计划量", name: "processPlanNum" },
          { text: "派工量", name: "dispatchNum" },
          { text: "生产数量", name: "productNum" },
          { text: "合格数量", name: "qualifiedNum" },
        ],
        checkObj: {},
        plArray: [],
        psArray: [],
        result: [],
        rules: {
          workDate: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
        },
      }
    },
    created() {

    },
    mounted() {
      if(this.listInfo) {
        this.list = this.listInfo
      }
    },
    methods: {
      // 查询前后三天日期
      getDay(date, day){
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
        today.setTime(targetday_milliseconds) //注意，这行是关键代码
        var tYear = today.getFullYear()
        var tMonth = today.getMonth()
        var tDate = today.getDate()
        var getDay = today.getDay()
        tMonth = this.doHandleMonth(tMonth + 1)
        tDate = this.doHandleMonth(tDate)
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weeks[getDay]
        return {
          day: tDate,
          week: week,
          date: tYear + "-" + tMonth + "-" + tDate
        }
      },
      doHandleMonth(month) {
        var m = month;
        if(month.toString().length == 1) {
          m = "0" + month;
        }
        return m;
      },
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; //给后台返回数据添加`isSet`标识
          return i;
        });
      },
      //添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, dispatchId: '', orderNo: this.cIndex, userName: '', dispatchNum: ''};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.dispatchId != row.dispatchId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.dispatchId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        //提交数据
        if (row.isSet) {
          const sel = this.sel
          if((sel.productNum == null || sel.productNum === '') || (sel.qualifiedNum == null || sel.qualifiedNum === '') ){
            return this.$message({
              type: 'error',
              message: "请输入必填项!"
            });
          }else {
            let data = JSON.parse(JSON.stringify(this.sel));
            for (let k in data) row[k] = data[k]
            this.$message({
              type: 'success',
              message: "添加成功!"
            });
            //然后这边重新读取表格数据
            this.readMasterUser();
            row.isSet = false;
          }
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      //删除带确认区 单行删除
      deleteRow(row, index, rows) {
        this.result.forEach((item, index2) =>{
          if(row.processRouteDetailId == item){
            this.result.splice(index2,1);
          }
        })
        console.log(this.result)
        console.log(row)
        rows.splice(index, 1);
      },

      fetchFormat() {
        getEmpList().then(res => {
          this.plArray = res.data;
        });
        teamList().then(res => {
          this.psArray = res.data;
        });
      },
      changeUserId(val, row) {
        const me = this
        this.plArray.forEach((item, index) => {
          if(item.FName == val) {
            me.$set(row,'userId', item.FItemID);
          }
        })
      },
      setRow() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.visible = true
      },
      saveData() {
          //判断必填项
          if (this.list.length> 0) {
            let arrrar = []
            let result = []
            this.list.forEach((item, index) => {
              let obj = {}
              //obj.adjDate = item.
              obj.productNum = item.productNum
              obj.qualifiedNum = item.qualifiedNum
              obj.dispatchId = item.dispatchId
              obj.userId = item.dispatchUserId
              obj.productWorkDetailId = item.productWorkDetailId
              if((obj.productNum == null || obj.productNum == '') || (obj.qualifiedNum == null || obj.qualifiedNum == '')){
                result.push(item.productWorkDetailId)
              }
              arrrar.push(obj)
            })
            if(result.length > 0 || arrrar.length <= 0){
              return this.$message({
                type: 'error',
                message: "请输入必填项!"
              });
            }
            //修改
            addProductWorkReport(arrrar).then(res => {
              this.$emit('hideDialog')
              this.$emit('uploadList')
            });
          }else {
            return false
          }
      },
    }
  };
</script>
<style>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>

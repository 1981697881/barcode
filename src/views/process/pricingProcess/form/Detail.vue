<template>
  <div>
    <el-form :model="form1" :rules="rules" ref="form1" :label-width="'80px'" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'id'" style="display: none">
              <el-input v-model="form1.id"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'日期'" prop="createTime">
                <div class="block" >
                  <el-date-picker
                    v-model="form1.createTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'单据号'" >
                <el-input v-model="form1.FModel" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-col>
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
                  <el-input size="mini" v-if="t.name == 'adjPrice'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <div class="block">
                  <el-date-picker
                    v-if="t.name == 'effectiveDate'"
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <div class="block">
                  <el-date-picker
                    v-if="t.name == 'expiryDate'"
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
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
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" v-if="isBtnClick" @click="setRow()"><span>+ 添加</span></div>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="工艺路线"
      v-if="visible"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form2" :rules="rules2" ref="form2" label-width="100px" :size="'mini'">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item :label="'工艺路线单据'">
                    <el-input v-model="form2.routeNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料'">
              <el-input v-model="form2.name" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工序'">
              <el-input v-model="form2.processName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" >
            <list
              class="list-main"
              height="350px"
              :columns="columns2"
              :loading="loading"
              :list="list2"
              index
              type
              @handle-size="handleSize"
              @handle-current="handleCurrent"
            />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="addMaster">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from "vuex";
  import { getRouteList } from "@/api/basic/index";
  import { processAdjustAdd, processAdjustUpdate, listByRouteAdjustNo } from "@/api/process/index";
  import {
    getPer
  } from '@/utils/auth'
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
        type: Object,
        default: null
      },
    },
    data() {
      return {
        loading: false,
        sel: null, // 选中行
        form2: {
          name: null,
          routeNo: null,
          number: null
        },
        plArray: [],
        pzArray: [],
        psArray: [],
        form1: {
          createTime: null,
          itemId: null,
          note: null,
          userId: null,
          FName: null,
          FUnitName: null,
          FModel: null,
          FChartNumber: null,
        },
        visible: null,
        isBtnClick: false,
        list: [],
        list2: {},
        columns2: [
          { text: "工艺路线单据号", name: "routeNo" },
          { text: "物料名称", name: "name" },
          { text: "物料代码", name: "number" },
          { text: "规格型号", name: "model" },
          { text: "计量单位", name: "unitName" },
          { text: "工序代码", name: "processNumber" },
          { text: "工序名称", name: "processName" },
          { text: "作业说明", name: "description" },
          { text: "工序控制码", name: "controlCodeName" },
          { text: "工序倍数", name: "diploid" },
          { text: "工序原单价", name: "price" },
        ],
        columns: [
          { text: "id", name: "id", default: false },
          { text: "工艺路线单据号", name: "routeNo" },
          { text: "物料名称", name: "name" },
          { text: "物料代码", name: "number" },
          { text: "规格型号", name: "model" },
          { text: "计量单位", name: "unitName" },
          { text: "工序代码", name: "processNumber" },
          { text: "工序名称", name: "processName" },
          { text: "作业说明", name: "description" },
          { text: "工序控制码", name: "controlCodeName"},
          { text: "工序倍数", name: "diploid" },
          { text: "工序原单价", name: "pastPrice" },
          { text: "工序变更后单价", name: "adjPrice" },
          { text: "生效日期", name: "effectiveDate" },
          { text: "失效日期", name: "expiryDate" },
        ],
        checkObj: {},
        pArray: [],
        result: [],
        rules: {
          note: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          createTime: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          itemId: [
            {required: true, message: '请选择物料', trigger: 'change'}
          ],

        },
        cIndex: 0,
        getTime: function() {
          var _this = this;
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth() + 1;
          let dd = new Date().getDate();
          let hh = new Date().getHours();
          let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
          let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
          _this.form1.createTime = yy + '-' + mm + '-' + dd
        },
        rules2: {
          controlCodeId: [
            {required: true, message: '请选择工序控制码', trigger: 'change'}
          ],
          processId: [
            {required: true, message: '请选择工序', trigger: 'change'}
          ], processTeamId: [
            {required: true, message: '请选择班组', trigger: 'change'}
          ], description: [
            {required: true, message: '请选择输入作业说明', trigger: 'blur'}
          ], diploid: [
            {required: true, message: '请选择输入工序倍数', trigger: 'blur'}
          ], price: [
            {required: true, message: '请选择输入工序单价', trigger: 'blur'}
          ], orderNo: [
            {required: true, message: '请选择输入工序顺序号', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.fetchFormat()
      if(this.listInfo) {
        this.isBtnClick = false
        this.form1.createTime = this.listInfo.createTime
        this.fetchData({adjustNo: this.listInfo.adjustNo})
      } else {
        this.isBtnClick = true
        this.getTime()
        this.form1.username = getPer('barun')
        this.form1.userId = getPer('userInfo')
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
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.form2.name != null && this.form2.name != '' ? obj.name = this.form2.name : null
        this.form2.number != null && this.form2.number != '' ? obj.number = this.form2.number : null
        this.form2.chartNumber != null && this.form2.chartNumber != '' ? obj.chartNumber = this.form2.chartNumber : null
        this.form2.processName != null && this.form2.processName != '' ? obj.processName = this.form2.processName : null
        return obj
      },
      fetchList(val, data = {
        pageNum: this.list2.pageNum || 1,
        pageSize: this.list2.pageSize || 50
      }) {
        this.loading = true;
        getRouteList(data, val).then(res => {
          this.loading = false;
          this.list2 = res.data;
        });
      },
      query() {
        this.list2.current = 1;
        this.fetchList(this.qFilter());
      },
      //监听每页显示几条
      handleSize(val) {
        this.list2.pageSize = val
        this.fetchList({});
      },
      //监听当前页
      handleCurrent(val) {
        this.list2.pageNum = val;
        this.fetchList({});
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
        const me = this
        if(me.selections.length>0){
          let selections = me.selections
          let list = me.list
          selections.forEach((item, index) =>{
            console.log(me.result.indexOf(item.processRouteDetailId) == -1)
            console.log(me.result)
            if(me.result.indexOf(item.processRouteDetailId) == -1){
              let obj = {}
              obj.processNumber = item.processNumber
              obj.processName = item.processName
              obj.processId = item.processId
              obj.description = item.description
              obj.controlCodeId = item.controlCodeId
              obj.controlCodeName = item.controlCodeName
              obj.diploid = item.diploid
              obj.pastPrice = item.price
              obj.name = item.name
              obj.processRouteId = item.processRouteId
              obj.isSet = false
              obj.number = item.number
              obj.itemId = item.itemId
              obj.processRouteDetailId = item.processRouteDetailId
              obj.model = item.model
              obj.FUnitName = item.unitName
              obj.adjPrice = 0
              obj.effectiveDate = me.getDay('', 0).date
              obj.expiryDate = me.getDay('', 0).date
              me.sel = JSON.parse(JSON.stringify(obj));
              me.result.push(item.processRouteDetailId)
              me.list.push(obj)
            }else{
              me.$message.warning("存在重复项，只添加不重复项");
            }
          })
          me.visible = false
          //this.sel = JSON.parse(JSON.stringify(j));
        }else{
          me.$message.warning("请选择行");
        }

      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.processRouteDetailId != row.processRouteDetailId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.processRouteDetailId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        //提交数据
        if (row.isSet) {
          const sel = this.sel
            if((sel.adjPrice == null || sel.adjPrice === '') || (sel.effectiveDate == null || sel.effectiveDate === '') || (sel.expiryDate == null || sel.expiryDate === '')){
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
      changeItem(val) {
        this.pArray.forEach((item, index) => {
          if(item.FItemID == val){
            this.form1.FNumber = item.FNumber
            this.form1.FUnitName = item.FUnitName
            this.form1.FModel = item.FModel
            this.form1.FChartNumber = item.FChartNumber
          }
        })
      },
      fetchFormat() {

      },
      setList(val) {
        this.list = []
        this.list.push(val)
      },
      setRow() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.visible = true
      },
      saveData() {
        this.$refs["form1"].validate((valid) => {
          //判断必填项
          if (valid) {
            let arrrar = []
            let result = []
            this.list.forEach((item, index) => {
              let obj = {}
              //obj.adjDate = item.
              obj.adjPrice = item.adjPrice
              obj.effectiveDate = item.effectiveDate
              obj.expiryDate = item.expiryDate
              obj.itemId = item.itemId
              obj.routeAdjustId = item.routeAdjustId
              obj.routeDetailId = item.processRouteDetailId
              if((obj.adjPrice == null || obj.adjPrice === '') || (obj.effectiveDate == null || obj.effectiveDate === '') || (obj.expiryDate == null || obj.expiryDate === '')){
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
            if (this.isBtnClick) {
              processAdjustAdd(arrrar).then(res => {
                this.$emit('hideDialog')
                this.$emit('uploadList')
              });
              //保存
            }else{
              processAdjustUpdate(arrrar).then(res => {
                this.$emit('hideDialog')
                this.$emit('uploadList')
              });
            }
          }else {
            return false
          }
        })
      },
      fetchData(val) {
        const me = this
        me.loading = true
        listByRouteAdjustNo(val).then(res => {
          if(res.success) {
            this.loading = false
            let data = res.data
            data.forEach((item, index) => {
              this.result.push(item.routeDetailId)
              item.processRouteDetailId = item.routeDetailId
            })
            this.list = data

          }
        });
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

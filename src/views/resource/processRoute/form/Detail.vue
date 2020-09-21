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
          <el-col :span="8">
            <el-form-item :label="'物料代码'" >
              <el-input v-model="form1.FNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label-width="'0px'" >
              <el-button @click="setRow">选择物料</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料名称'" >
              <el-input v-model="form1.FName" disabled></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="7">
          <el-form-item :label="'物料名称'" prop="itemId">
            <el-select v-model="form1.itemId" filterable placeholder="请选择" style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->

        </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'创建人'" >
                <el-input v-model="form1.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'创建人'" style="display: none;">
                <el-input v-model="form1.userId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'创建时间'" prop="createTime">
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
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'规格型号'" >
                <el-input  v-model="form1.FModel" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'计量单位'" >
                <el-input v-model="form1.FUnitName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'图号'" >
                <el-input  v-model="form1.FChartNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'备注'" >
                <el-input v-model="form1.note"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <!--<div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
            </div>-->
            <el-table el-table style="height: 300px" :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" v-if="t.name == 'orderNo'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input size="mini" v-if="t.name == 'description'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input size="mini" v-if="t.name == 'diploid'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input size="mini" v-if="t.name == 'price'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <!--<el-input size="mini" v-if="t.name == 'processNumber'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input size="mini" v-if="t.name == 'controlCodeNumber'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input size="mini" v-if="t.name == 'processTeamNumber'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>-->
                  <el-select size="mini" v-if="t.name == 'processName'" v-model="sel[t.name]" placeholder="请选择" @change="changeProcessId($event, sel)">
                    <el-option
                      v-for="(t,i) in plArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                  <el-select size="mini" v-if="t.name == 'controlCodeName'" v-model="sel[t.name]" placeholder="请选择" @change="changeCodeTeamId($event, sel)">
                    <el-option
                      v-for="(t,i) in pzArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                  <el-select size="mini" v-if="t.name == 'processTeamName'" v-model="sel[t.name]" placeholder="请选择" @change="changeProcessTeamId($event, sel)">
                    <el-option
                      v-for="(t,i) in psArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                </span>
                <span v-else>{{scope.row[t.name]}}</span>
              </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.$index,list)" style="cursor: pointer;">
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
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="物料信息"
      v-if="visible"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form2" :rules="rules2" ref="form2" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物料名称'">
              <el-input v-model="form2.name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料代码'">
              <el-input v-model="form2.number" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'规格'">
              <el-input v-model="form2.model" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'图号'">
              <el-input v-model="form2.chartNumber" ></el-input>
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
              height="300px"
              :columns="columns2"
              :loading="loading"
              :list="list2"
              index
              @row-click="rowClick"
              @dblclick="dblclick"
              @handle-size="handleSize"
              @handle-current="handleCurrent"
            />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
      <el-button type="success" @click="pasteData">粘贴</el-button>
    </div>
  </div>
</template>

<script>
  import {teamList, controlList, processList, processRouteAdd, getItemList, processRouteUpdate, routeListInfo, getItemsList} from "@/api/basic/index";
  import {
    getPer
  } from '@/utils/auth'
  import List from "@/components/List"
  import {mapGetters} from "vuex";
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
          model: null,
          chartNumber: null,
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
        pidS: [],
        list: [],
        list2: {},
        columns2: [
          { text: "物料名称", name: "FName" },
          { text: "物料代码", name: "FNumber" },
          { text: "规格型号", name: "FModel" },
          { text: "计量单位", name: "FUnitName" },
          { text: "图号", name: "FChartNumber" }
        ],
        columns: [
          { text: "id", name: "id", default: false },
          { text: "工序顺序号", name: "orderNo" },
          { text: "工序代码", name: "processNumber" },
          { text: "工序名称", name: "processName" },
          { text: "工序id", name: "processId", default: false },
          { text: "作业说明", name: "description" },
          { text: "工序控制码", name: "controlCodeId", default: false },
          { text: "工序控制码", name: "controlCodeName"},
          { text: "工序倍数", name: "diploid" },
          { text: "工序单价", name: "price" },
          { text: "班组代码", name: "processTeamNumber" },
          { text: "班组id", name: "processTeamId", default: false },
          { text: "班组", name: "processTeamName" },
        ],
        checkObj: {},
        pArray: [],
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
        this.fetchData({processRouteId: this.listInfo.processRouteId})
      } else {
        this.getTime()
        this.form1.username = getPer('barun')
        this.form1.userId = getPer('userInfo')
      }
    },
    methods: {
      //监听单击某一行
      rowClick(obj) {
       this.checkObj = obj.row
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
        getItemsList(data, val).then(res => {
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
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, orderNo: this.cIndex, processNumber: '', processName: '', processId: '', description: '', controlCodeId: '', controlCodeName: '', diploid: 1, price: '', processTeamNumber: '', processTeamId: '', processTeamName: ''};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.processId != row.processId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.processId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          //项目是模拟请求操作  自己修改下
          const sel = this.sel
          console.log(sel.processName == null || sel.processName == '')
            if((sel.orderNo == null || sel.orderNo == '') || (sel.processName == null || sel.processName == '') || (sel.controlCodeName == null || sel.controlCodeName == '') || (sel.diploid == null || sel.diploid == '') || (sel.processTeamName == null || sel.processTeamName == '')){
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
      deleteRow(index, rows) {
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
      changeProcessId(val, row) {
         const me = this
        this.plArray.forEach((item, index) => {
          if(item.FName == val) {
            me.$set(row,'processId', item.FItemID);
            me.$set(row,'processNumber', item.FNumber);
          }
        })
        console.log(row)
      },
      changeProcessTeamId(val, row) {
        const me = this
        this.psArray.forEach((item, index) => {
          if(item.FName == val) {
            me.$set(row, 'processTeamId', item.FItemID);
            me.$set(row, 'processTeamNumber', item.FNumber);
          }
        })
      },
      changeCodeTeamId(val, row) {
        const me = this
        this.pzArray.forEach((item, index) => {
          if(item.FName == val) {
            me.$set(row,'controlCodeId', item.FItemID);
          }
        })
      },
      fetchFormat() {
        processList().then(res => {
          this.plArray = res.data;
        });
        controlList().then(res => {
          this.pzArray = res.data;
        });
        teamList().then(res => {
          this.psArray = res.data;
        });
        getItemList().then(res => {
          this.pArray = res.data;
        });
      },
      setList(val) {
        this.list = []
        this.list.push(val)
      },
      setRow() {
        this.visible = true
      },
      dblclick(obj, index) {
        if (obj.row.FItemID) {
          this.form1.itemId = obj.row.FItemID
          this.form1.FName = obj.row.FName
          this.form1.FNumber = obj.row.FNumber
          this.form1.FUnitName = obj.row.FUnitName
          this.form1.FModel = obj.row.FModel
          this.form1.FChartNumber = obj.row.FChartNumber
          this.visible = false
        } else {
          this.$message({
            message: "无选中数据",
            type: "warning"
          })
        }
       //this.pwdChange(scope.row,scope.$index,true)
      },
      pasteData() {
        let selection = this.selections
        selection.forEach((item, index) => {
          let obj = {}
          obj.orderNo = item.orderNo
          obj.processNumber = item.processNumber
          obj.processName = item.processName
          obj.description = item.description
          obj.controlCodeId = item.controlCodeId
          obj.controlCodeName = item.controlCodeName
          obj.diploid = item.diploid
          obj.price = item.price
          obj.processTeamNumber = item.processTeamNumber
          obj.processTeamId = item.processTeamId
          obj.processTeamName = item.processTeamName
          this.list.push(obj)
        })
      },
      saveData() {
        this.$refs["form1"].validate((valid) => {
          //判断必填项
          if (valid) {
            let result = []
            this.list.forEach((item, index) => {
              item.id = item.processRouteDetailId
              delete item.ProcessNumber
              delete item.processRouteDetailId
              delete item.ProcessTeamNumber
              delete item.isSet
              delete item.processRouteId
              if((item.orderNo == null || item.orderNo == '') || (item.processName == null || item.processName == '') || (item.controlCodeName == null || item.controlCodeName == '') || (item.diploid == null || item.diploid == '') || (item.processTeamName == null || item.processTeamName == '')){
                result.push(item.id)
              }
            })
            //修改
            delete this.form1.createTime
            this.form1.detailList = this.list
            if(result.length > 0 || this.form1.detailList.length <= 0){
              return this.$message({
                type: 'error',
                message: "请输入必填项!"
              });
            }
            if (typeof (this.form1.id) != undefined && this.form1.id != null) {
              processRouteUpdate(this.form1).then(res => {
                this.$emit('hideDialog')
                this.$emit('uploadList')
              });
              //保存
            }else{
              processRouteAdd(this.form1).then(res => {
                this.$emit('hideDialog')
                this.$emit('uploadList')
              });
            }
          }else {
            return false
          }
        })
      },
      getItemInfo(FItemID){
        const me = this
        getItemList().then(reso => {
          reso.data.forEach((item, index) => {
            if(item.FItemID == FItemID){
              me.form1.FNumber = item.FNumber
              me.form1.FUnitName = item.FUnitName
              me.form1.FModel = item.FModel
              me.form1.FChartNumber = item.FChartNumber
            }
          })
        });
      },
      fetchData(val) {
        const me = this
        me.loading = true
        routeListInfo(val).then(res => {
          if(res.success) {
            console.log(res)
            this.loading = false
            this.form1.itemId = res.data[0].itemId
            this.form1.FName = res.data[0].name
            this.form1.id = res.data[0].processRouteId
            this.form1.username = res.data[0].username
            this.form1.userId = res.data[0].userId
            this.form1.createTime = res.data[0].createTime
            this.form1.FNumber = res.data[0].number
            this.form1.FUnitName = res.data[0].unitName
            this.form1.FModel = res.data[0].model
            this.form1.FChartNumber = res.data[0].chartNumber
            this.list = res.data
          }
        });
      },
      confirm() {
        if (this.checkObj.FItemID) {
          this.form1.itemId = this.checkObj.FItemID
          this.form1.FName = this.checkObj.FName
          this.form1.FNumber = this.checkObj.FNumber
          this.form1.FUnitName = this.checkObj.FUnitName
          this.form1.FModel = this.checkObj.FModel
          this.form1.FChartNumber = this.checkObj.FChartNumber
          this.visible = false
        } else {
          this.$message({
            message: "无选中数据",
            type: "warning"
          })
        }
      }
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

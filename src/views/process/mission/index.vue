<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialogT" @delList="delivery"  @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="uploadPage"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      :fullscreen="true"
      v-if="visible"
      :width="'100%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="派工信息"
      :fullscreen="true"
      v-if="visible2"
      :width="'100%'"
      destroy-on-close
    >
      <info-t @hideDialog="hideWindowT" @uploadList="upload" :listInfo="listInfo2"></info-t>
    </el-dialog>
  </div>
</template>

<script>
  import { TabsBar, List } from "./components";
  import { Info, InfoT } from "./form";

  export default {
    components: {
      TabsBar,
      List,
      InfoT,
      Info
    },
    data() {
      return {
        visible: null,
        visible2: null,
        listInfo: null,
        listInfo2: null
      };
    },
    mounted() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    methods: {
      delivery(obj) {
        if(obj) {
          this.$refs.list.Delivery(obj.productWorkDetailId)
        }
      },
      hideWindow(val) {
        this.visible = val
      },hideWindowT(val) {
        this.visible2 = val
      },
      handlerDialog(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
        this.visible = true
      },
      handlerDialogT(obj) {
        this.listInfo2 = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo2 = info
        }
        this.visible2 = true
      },
      // 查询
      query() {
        this.$refs.list.fetchData(this.$refs.tabs.qFilter())
      },
      // 查询
      uploadPage(val) {
        this.$refs.list.fetchData(this.$refs.tabs.qFilter())
      },
      // 更新列表
      upload(){
        this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>

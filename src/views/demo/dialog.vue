<template>
  <div>
    <el-button @click="openExportDialog">导出</el-button>

    <!-- 导出dialog -->
    <el-dialog
      title="导出"
      :visible.sync="exportDialogVisible"
      :append-to-body="true"
      @close="closeExport"
      width="750px">
      <app-export-dialog @closeExport="closeExport" @submitExport="submitExport"></app-export-dialog>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'demo-dialog',
    data() {
      return {
        // 导出
        exportDialogVisible: false
      }
    },
    methods: {
      // 打开 - 导出
      openExportDialog() {
        this.exportDialogVisible = true
      },
      // 关闭 - 导出
      closeExport() {
        this.exportDialogVisible = false
      },
      // 提交 - 导出
      submitExport() {
        this.exportDialogVisible = false
      }
    }
  }
</script>

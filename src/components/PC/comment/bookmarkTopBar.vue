<template>
  <div class="bookmark-top-bar-wrapper">
    <div class="search-bar">
      <input
        type="text"
        placeholder="请输入作品名称"
        v-model="searchKey"
        @keyup.enter="$emit('search',searchKey)"
      />
      <i class="fa fa-search"></i>
    </div>
    <div class="edit-wrapper">
      <div class="is-edit" v-show="isEdit">
        <span class="is-select">
          已选 <span class="select-count">{{ count }}</span>
        </span>
        <input type="checkbox" id="select-all" v-model="checkVal"/>
        <label for="select-all">全选</label>
        <span class="delete" @click="$emit('remove')">删除</span>
        <span class="complete" @click="complete">完成</span>
      </div>
      <div class="not-edit" v-show="!isEdit" @click="edit">
        <i class="fa fa-edit"></i>
        整理{{ pageName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookmarkTopBar",
  props: {
    // 页面名称
    pageName: {
      type: String,
      default: "",
    },
    // 已选的列表元素数量
    count: {
      type: Number,
      default: 0,
    },
    // 总列表长度
    length: {
      type:Number,
      default:0
    }
  },
  data() {
    return {
      isEdit: false,
      searchKey: "",
      checkVal: false,
    };
  },
  methods: {
    complete(){
      this.isEdit = false
      this.$emit('complete',this.isEdit)
    },
    edit(){
      this.isEdit = true
      this.$emit('edit',this.isEdit)
    }
  },
  watch: {
    count(val){
      console.log(val);
      if(val == this.length) this.checkVal = true
      else {
        if(this.checkVal) this.checkVal = false
      }
    },
    checkVal(val){
      this.$emit('check',val)
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark-top-bar-wrapper {
  width: 997px;
  height: 38px;
  line-height: 34px;
  overflow: hidden;
  .search-bar {
    float: left;
    position: relative;
    width: 204px;
    height: 34px;
    input {
      width: 148px;
      height: 32px;
      padding: 0 35px 0 20px;
      border: 1px solid #d0d0d0;
      border-radius: 16px;
    }
    i {
      position: absolute;
      right: 20px;
      top: 8px;
      color: #ccc;
    }
  }
  .edit-wrapper {
    float: right;
    color: #666;
    font-size: 14px;
    .not-edit {
      cursor: pointer;
    }
    .is-edit {
      width: 340px;
      height: 32px;
      line-height: 32px;
      #select-all {
        position: relative;
        top: 2px;
        margin-left: 14px;
      }
      .delete {
        margin-left: 30px;
      }
      .delete,
      .complete {
        display: inline-block;
        width: 74px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 10px;
        border-radius: 15px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      .complete {
        color: #fff;
        background-color: #ff494f;
      }
    }
  }
}
</style>
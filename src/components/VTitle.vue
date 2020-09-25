<template>
  <h4 class="title">{{text}}{{sort}}</h4>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    props:{
        text:{
            type:String,
            default:""
        },
        sort:{
            type:String,
            default:""
        }
    }
};
</script>

<style lang='less' scoped>
.title {
  font-size: 12px;
  padding: 10px;
  color: #666;
}
</style>
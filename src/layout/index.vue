<template>
    <div class="weather-container">
        <container-header />
        <current />
        <hours />
        <div class="container">
            <days />
            <live />
        </div>
        <container-footer />
    </div>
</template>

<script>
import containerHeader from '../components/Header';
import Current from '../components/Current';
import Hours from '../components/Hours';
import Days from '../components/Days';
import Live from '../components/Live';
import containerFooter from '../components/Footer';
export default {
    name: 'Index',
    components:{
        containerHeader,
        Current,
        Hours,
        Days,
        Live,
        containerFooter
    }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/reset.css');
.weather-container{
    min-width: 1200px;
    box-sizing: border-box;
    background: #f6f9fe  url('../assets/img/bg.jpg') center top no-repeat;
    font-family: "PingFang SC","Microsoft YaHei",Simsun,Helvetica,Arial,sans-serif;
}
.container{
    display: flex;
    padding: 0 70px;
}
</style>
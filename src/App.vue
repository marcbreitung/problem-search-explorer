<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: url('assets/fonts/Roboto/roboto-v18-latin-regular.eot'); /* IE9 Compat Modes */
        src: local('Roboto'), local('Roboto-Regular'),
        url('assets/fonts/Roboto/roboto-v18-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('assets/fonts/Roboto/roboto-v18-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('assets/fonts/Roboto/roboto-v18-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('assets/fonts/Roboto/roboto-v18-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('assets/fonts/Roboto/roboto-v18-latin-regular.svg#Roboto') format('svg'); /* Legacy iOS */
    }
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }
    #app {
        background: #D9CFC7;
    }
</style>

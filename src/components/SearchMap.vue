<template>
    <div id="map" class="map">
        <canvas id="search-map"></canvas>
    </div>
</template>

<script>
    export default {
        name: 'SearchMap',
        props: ['nodes'],
        created: function () {
            this.$nextTick(function () {
                console.log(document.getElementById('search-map'))
            })
        },
        watch: {
            nodes: function (val) {
                console.log(val)
            }
        }
    }
</script>

<style scoped>
    .map {
        flex-grow: 1;
    }
</style>
